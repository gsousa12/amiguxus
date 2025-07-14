import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { validationMessages } from 'src/common/utils/validation-message';

export class SignupRequestDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: validationMessages.isString })
  name: string;

  @IsString({ message: validationMessages.isString })
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @Length(6, 20, { message: validationMessages.Length })
  password: string;

  phoneNumber: string | null;

  city: string;

  state: string;
}
