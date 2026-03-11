import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwt: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password_hash) return null;
    const ok = await bcrypt.compare(pass, user.password_hash);
    if (ok) {
      const { password_hash, ...rest } = user as any;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, role: user.role };
    return {
      accessToken: this.jwt.sign(payload)
    };
  }

  async register(data: { email: string; password: string; name?: string; role?: string }) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) {
      throw new UnauthorizedException('Email already registered');
    }
    const hash = await bcrypt.hash(data.password, 12);
    const user = await this.usersService.create({
      email: data.email,
      name: data.name || null,
      password_hash: hash,
      role: data.role || 'customer'
    });
    return user;
  }
}
