import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';
import { TableEntity } from './table.entity';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => Restaurant, { nullable: false })
  restaurant: Restaurant;

  @ManyToOne(() => TableEntity, { nullable: true })
  table: TableEntity;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'int' })
  guests: number;

  @Column({ default: 'pending_payment' })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
