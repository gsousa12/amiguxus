import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LoginRequestDto } from '../core/application/dtos/request/login.request.dto';
import { Response, Request } from 'express';
import { AuthService } from '../core/application/service/auth.service';
import { ValidateRequestDto } from '../core/application/dtos/request/validate.request.dto';
import { LogoutRequestDto } from '../core/application/dtos/request/logout.request.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginRequestDto, @Res({ passthrough: true }) res: Response) {
    await this.authService.login(request, res);
    return null;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/validate')
  @HttpCode(HttpStatus.OK)
  async validate(@Body() request: ValidateRequestDto, @Req() req: Request) {
    if (!request.userId) {
      throw new UnauthorizedException('User ID is required for validation');
    }
    await this.authService.validate(request.userId, req);
    return null;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body() request: LogoutRequestDto, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(request.userId, res);
    return null;
  }
}
