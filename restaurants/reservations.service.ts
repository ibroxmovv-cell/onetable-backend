import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TableEntity } from '../entities/table.entity';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import { acquireLock, releaseLock } from '../utils/redisLock';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservationsService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(Reservation) private repo: Repository<Reservation>,
    @InjectRepository(TableEntity) private tableRepo: Repository<TableEntity>,
    @Inject('REDIS_CLIENT') private redisClient: Redis,
    private config: ConfigService
  ) {
    this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY') || '', { apiVersion: '2022-11-15' });
  }

  async findAvailableTable(restaurantId: string, guests: number) {
    const candidates = await this.tableRepo.find({ where: { restaurant: { id: restaurantId }, is_active: true } as any });
    const sorted = candidates.filter((t) => t.capacity >= guests).sort((a, b) => a.capacity - b.capacity);
    return sorted[0] || null;
  }

  async createPendingReservation(payload: any, userId: string) {
    const { restaurantId, date, start_time, guests } = payload;
    if (!restaurantId || !date || !start_time || !guests) throw new BadRequestException('Missing fields');

    const table = await this.findAvailableTable(restaurantId, guests);
    if (!table) throw new BadRequestException('No table available');

    const lockKey = `table_lock:${table.id}`;
    const token = uuidv4();
    const locked = await acquireLock(this.redisClient, lockKey, token, 15 * 60 * 1000);
    if (!locked) throw new BadRequestException('Table currently being held - try again');

    const res = this.repo.create({
      user: { id: userId } as any,
      restaurant: { id: restaurantId } as any,
      table: { id: table.id } as any,
      date,
      start_time,
      guests,
      status: 'pending_payment',
      deposit_amount: parseInt(this.config.get('PAYMENT_DEPOSIT_AMOUNT_UZS') || '50000', 10)
    });
    const saved = await this.repo.save(res);

    const paymentAmountUsd = Math.round((parseInt(String(saved.deposit_amount), 10) / 11000) * 100);
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.max(paymentAmountUsd, 50),
      currency: 'usd',
      metadata: { reservationId: saved.id }
    });

    return { reservation: saved, clientSecret: intent.client_secret };
  }

  async confirmReservation(reservationId: string, paymentInfo: any) {
    const r = await this.repo.findOne({ where: { id: reservationId }, relations: ['table'] });
    if (!r) throw new BadRequestException('Reservation not found');
    r.status = 'confirmed';
    await this.repo.save(r);

    const lockKey = `table_lock:${r.table.id}`;
    await this.redisClient.del(lockKey);
    return r;
  }
}
