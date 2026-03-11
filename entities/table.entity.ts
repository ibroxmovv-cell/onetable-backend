import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity({ name: 'tables' })
export class TableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Restaurant, { onDelete: 'CASCADE' })
  restaurant: Restaurant;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'jsonb', nullable: true })
  layout_meta: any;

  @CreateDateColumn()
  created_at: Date;
}
