import { Controller, Post, Body, UseGuards, Req, Get, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';

@Controller('api/v1/reservations')
export class ReservationsController {
  constructor(private svc: ReservationsService) {}

  @Post()
  async create(@Body() body: any, @Req() req: any) {
    const userId = req.user?.id || body.userId || null;
    if (!userId) return { error: 'unauthenticated' };
    return this.svc.createPendingReservation(
      {
        restaurantId: body.restaurant_id,
        date: body.date,
        start_time: body.start_time,
        guests: body.guests
      },
      userId
    );
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.svc.repo.findOne({ where: { id } });
  }
}
