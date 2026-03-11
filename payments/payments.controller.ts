import { Controller, Post, Req, Body, Headers, HttpCode } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { Payment } from '../entities/payment.entity';

@Controller('api/v1/payments')
export class PaymentsController {
  private stripe: Stripe;
  constructor(
    private config: ConfigService,
    @InjectRepository(Reservation) private resRepo: Repository<Reservation>,
    @InjectRepository(Payment) private payRepo: Repository<Payment>
  ) {
    this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY') || '', { apiVersion: '2022-11-15' });
  }

  @Post('webhook')
  @HttpCode(200)
  async stripeWebhook(@Req() req: any, @Headers('stripe-signature') signature: string) {
    const webhookSecret = this.config.get('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
    } catch (err) {
      console.error('Stripe webhook signature verification failed.', err);
      return { received: false };
    }

    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object as Stripe.PaymentIntent;
      const reservationId = pi.metadata?.reservationId;
      if (reservationId) {
        const reservation = await this.resRepo.findOne({ where: { id: reservationId }, relations: ['user'] });
        if (reservation) {
          reservation.status = 'confirmed';
          await this.resRepo.save(reservation);

          const payment = this.payRepo.create({
            reservation: reservation,
            user: reservation.user,
            gateway: 'stripe',
            amount: (pi.amount_received || pi.amount) / 100,
            currency: pi.currency,
            status: 'succeeded',
            transaction_reference: pi.id
          });
          await this.payRepo.save(payment);
        }
      }
    }

    return { received: true };
  }
}
