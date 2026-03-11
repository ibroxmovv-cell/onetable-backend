import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  password_hash: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: 'customer' })
  role: string;

  @Column({ default: 'en' })
  preferred_language: string;

  @CreateDateColumn()
  created_at: Date;
}
