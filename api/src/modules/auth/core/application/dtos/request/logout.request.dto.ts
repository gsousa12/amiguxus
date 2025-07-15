import { IsNumber } from 'class-validator';

export class LogoutRequestDto {
  @IsNumber()
  userId: number;
}
