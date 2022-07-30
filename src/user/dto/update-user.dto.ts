import { PartialType } from '@nestjs/swagger';
import { OmitType } from '@nestjs/swagger';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(RegisterUserDto, ['email'] as const),
) {}
