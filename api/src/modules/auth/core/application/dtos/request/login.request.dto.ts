import { IsEmail, IsString, Length } from 'class-validator';
import { validationMessages } from 'src/common/utils/validation-message';

export class LoginRequestDto {
  @IsString({ message: validationMessages.isString })
  @IsEmail({}, { message: validationMessages.isEmail })
  email: string;

  @IsString({ message: validationMessages.isString })
  @Length(6, 20, { message: validationMessages.Length })
  password: string;
}
