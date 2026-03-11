import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  async create(user: Partial<User>) {
    const u = this.userRepo.create(user);
    return this.userRepo.save(u);
  }

  async update(id: string, patch: Partial<User>) {
    await this.userRepo.update({ id }, patch);
    return this.findById(id);
  }
}
