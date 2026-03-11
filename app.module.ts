import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './payments/payments.module';
import { AdminModule } from './admin/admin.module';
import { RedisModule } from './redis/redis.module';
import { join } from 'path';
import * as process from 'process';
import { User } from './entities/user.entity';
import { Restaurant } from './entities/restaurant.entity';
import { TableEntity } from './entities/table.entity';
import { Reservation } from './entities/reservation.entity';
import { Payment } from './entities/payment.entity';
import { Favorite } from './entities/favorite.entity';
import { Review } from './entities/review.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const dbUrl = process.env.DATABASE_URL;
        const options: DataSourceOptions = {
          type: 'postgres',
          url: dbUrl,
          synchronize: false,
          logging: false,
          entities: [User, Restaurant, TableEntity, Reservation, Payment, Favorite, Review],
          migrations: [join(__dirname, '../migrations/*{.ts,.js}')]
        };
        return options;
      }
    }),
    RedisModule,
    UsersModule,
    AuthModule,
    RestaurantsModule,
    ReservationsModule,
    PaymentsModule,
    AdminModule
  ]
})
export class AppModule {}
