import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RestaurantsService {
  constructor(@InjectRepository(Restaurant) private repo: Repository<Restaurant>) {}

  async list(filters: any = {}) {
    const qb = this.repo.createQueryBuilder('r').where('r.status = :status', { status: 'approved' });

    if (filters.q) {
      qb.andWhere('(r.name_en ILIKE :q OR r.name_ru ILIKE :q OR r.name_uz ILIKE :q OR r.cuisine::text ILIKE :q)', {
        q: `%${filters.q}%`
      });
    }
    if (filters.cuisine) {
      qb.andWhere(':cuisine = ANY (r.cuisine)', { cuisine: filters.cuisine });
    }
    if (filters.price) {
      qb.andWhere('r.price_category = :price', { price: filters.price });
    }
    qb.limit(50);
    return qb.getMany();
  }

  async getById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async create(payload: Partial<Restaurant>) {
    const r = this.repo.create(payload);
    return this.repo.save(r);
  }

  async update(id: string, patch: Partial<Restaurant>) {
    await this.repo.update({ id }, patch);
    return this.getById(id);
  }
}
