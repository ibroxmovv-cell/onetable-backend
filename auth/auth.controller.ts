import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    const user = await this.authService.register(body);
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) return { error: 'invalid_credentials' };
    return this.authService.login(user);
  }
}
