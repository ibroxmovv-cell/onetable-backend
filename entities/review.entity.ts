import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Restaurant)
  restaurant: Restaurant;

  @Column({ type: 'smallint', nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: true })
  text_en: string;
  @Column({ type: 'text', nullable: true })
  text_ru: string;
  @Column({ type: 'text', nullable: true })
  text_uz: string;

  @CreateDateColumn()
  created_at: Date;
}
