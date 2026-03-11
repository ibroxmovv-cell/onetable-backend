import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async me(@Req() req: any) {
    return req.user;
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
