import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';
import { TableEntity } from './table.entity';
import { Payment } from './payment.entity';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.reservations, { onDelete: 'SET NULL' })
  user: User;

  @ManyToOne(() => Restaurant, (r) => r, { onDelete: 'CASCADE' })
  restaurant: Restaurant;

  @ManyToOne(() => TableEntity, { nullable: true })
  table: TableEntity;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time', nullable: true })
  end_time: string;

  @Column({ type: 'int' })
  guests: number;

  @Column({ default: 'pending_payment' })
  status: string;

  @Column({ type: 'int', nullable: true })
  deposit_amount: number;

  @ManyToOne(() => Payment, { nullable: true })
  payment: Payment;

  @CreateDateColumn()
  created_at: Date;
}
