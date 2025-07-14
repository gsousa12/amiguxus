import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../core/application/services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { createApiResponse } from 'src/common/utils/api-response';
import { SignupRequestDto } from '../../core/application/dtos/request/signup.request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() request: SignupRequestDto) {
    await this.userService.signup(request);
    return null;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/information')
  @HttpCode(HttpStatus.OK)
  async getUserInfo(@Req() request: Request) {
    if (!request.user) {
      throw new BadRequestException('Usuário não encontrado.');
    }
    return createApiResponse(request.user);
  }
}
