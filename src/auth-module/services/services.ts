import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash, timingSafeEqual } from 'node:crypto';
import { requireEnv } from '../config.js';

/** Сравнение за постоянное время: хеш выравнивает длину для `timingSafeEqual`. */
const safeEqual = (a: string, b: string) =>
  timingSafeEqual(
    createHash('sha256').update(a).digest(),
    createHash('sha256').update(b).digest(),
  );

@Injectable()
export class AuthService {
  private readonly login: string;
  private readonly password: string;

  constructor(
    private readonly jwtService: JwtService,
    config: ConfigService,
  ) {
    this.login = requireEnv(config, 'ADMIN_LOGIN');
    this.password = requireEnv(config, 'ADMIN_PASSWORD');
  }

  /**
   * Админ один, креды лежат в `.env`. На любой неподходящий вход — кривое
   * тело, не-строки, неверный пароль — один и тот же 401.
   */
  async signIn(login: unknown, password: unknown) {
    const valid =
      typeof login === 'string' &&
      typeof password === 'string' &&
      // Оба сравнения выполняются всегда, чтобы по времени ответа
      // нельзя было понять, угадан ли логин.
      [safeEqual(login, this.login), safeEqual(password, this.password)].every(
        Boolean,
      );

    if (!valid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return { token: await this.jwtService.signAsync({ sub: 'admin' }) };
  }
}
