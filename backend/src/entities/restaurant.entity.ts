import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'restaurants' })
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: true })
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

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'numeric', nullable: true })
  lat: number;

  @Column({ type: 'numeric', nullable: true })
  lng: number;

  @CreateDateColumn()
  created_at: Date;
}
