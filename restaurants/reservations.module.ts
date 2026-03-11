import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { TableEntity } from '../entities/table.entity';
import { Restaurant } from '../entities/restaurant.entity';
import { Payment } from '../entities/payment.entity';
import { RedisModule } from '../redis/redis.module';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, TableEntity, Restaurant, Payment]), RestaurantsModule, UsersModule],
  providers: [ReservationsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
