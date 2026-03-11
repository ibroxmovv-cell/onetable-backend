import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('api/v1/restaurants')
export class RestaurantsController {
  constructor(private service: RestaurantsService) {}

  @Get()
  async list(@Query() query: any) {
    return this.service.list(query);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.service.create(body);
  }
}
