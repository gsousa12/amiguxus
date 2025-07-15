import { IsNumber } from 'class-validator';

export class ValidateRequestDto {
  @IsNumber()
  userId: number;
}
