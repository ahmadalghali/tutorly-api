import { OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';
import { UserRole } from '../enum/user-role.enum';

export class RegisterUserDto extends OmitType(User, [
  'createdAt',
  'deletedAt',
  'enabled',
  'id',
  'locked',
  'updatedAt',
  'profileImageUrl',
  'role',
] as const) {}
