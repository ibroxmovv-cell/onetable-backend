import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '../entities/restaurant.entity';

@Controller('api/v1/admin')
export class AdminController {
  constructor(@InjectRepository(Restaurant) private repo: Repository<Restaurant>) {}

  @Get('restaurants')
  async pending() {
    return this.repo.find({ where: { status: 'pending' }, take: 50 });
  }

  @Post('restaurants/:id/approve')
  async approve(@Param('id') id: string) {
    await this.repo.update({ id }, { status: 'approved' });
    return { ok: true };
  }
}
