import { User } from 'src/user/entities/user.entity';
import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  // @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
