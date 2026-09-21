import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { LoginDto } from '../dto.js';
import { Public } from '../public.js';
import { AuthService } from '../services/services.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(ThrottlerGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body?: Partial<LoginDto>) {
    return this.authService.signIn(body?.login, body?.password);
  }
}
