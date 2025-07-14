import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginRequestDto } from '../core/application/dtos/request/login.request.dto';
import { Response } from 'express';
import { AuthService } from '../core/application/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginRequestDto, @Res({ passthrough: true }) response: Response) {
    await this.authService.login(request, response);
    return null;
  }
}
