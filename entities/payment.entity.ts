import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Reservation } from './reservation.entity';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reservation, { nullable: true })
  reservation: Reservation;

  @ManyToOne(() => User, (u) => u.payments, { nullable: true })
  user: User;

  @Column()
  gateway: string;

  @Column({ type: 'int' })
  amount: number;

  @Column()
  currency: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  transaction_reference: string;

  @CreateDateColumn()
  created_at: Date;
}
