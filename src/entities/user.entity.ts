import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Reservation } from './reservation.entity';
import { Review } from './review.entity';
import { Favorite } from './favorite.entity';
import { Payment } from './payment.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: true })
  password_hash: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: 'customer' })
  role: 'customer' | 'owner' | 'admin';

  @Column({ default: 'en' })
  preferred_language: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Restaurant, (r) => r.owner_user)
  restaurants: Restaurant[];

  @OneToMany(() => Reservation, (res) => res.user)
  reservations: Reservation[];

  @OneToMany(() => Review, (rev) => rev.user)
  reviews: Review[];

  @OneToMany(() => Favorite, (f) => f.user)
  favorites: Favorite[];

  @OneToMany(() => Payment, (p) => p.user)
  payments: Payment[];
}
