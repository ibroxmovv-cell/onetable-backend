import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { User } from './user.entity';
import { TableEntity } from './table.entity';
import { Reservation } from './reservation.entity';
import { Review } from './review.entity';

@Entity({ name: 'restaurants' })
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.restaurants, { onDelete: 'CASCADE' })
  owner_user: User;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  name_en: string;
  @Column({ nullable: true })
  name_ru: string;
  @Column({ nullable: true })
  name_uz: string;

  @Column({ type: 'text', nullable: true })
  description_en: string;
  @Column({ type: 'text', nullable: true })
  description_ru: string;
  @Column({ type: 'text', nullable: true })
  description_uz: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'numeric', nullable: true })
  lat: number;

  @Column({ type: 'numeric', nullable: true })
  lng: number;

  @Column({ nullable: true })
  price_category: string;

  @Column('text', { array: true, nullable: true })
  cuisine: string[];

  @Column({ type: 'jsonb', nullable: true })
  opening_hours: any;

  @Column({ type: 'jsonb', nullable: true })
  images: string[];

  @Column({ type: 'timestamp with time zone', nullable: true })
  premium_until: Date;

  @Column({ default: false })
  has_english_menu: boolean;

  @Column('text', { array: true, nullable: true })
  tourist_tags: string[];

  @CreateDateColumn()
  created_at: Date;
}
