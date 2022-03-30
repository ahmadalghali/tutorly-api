import { UserRole } from 'src/user/enum/user-role.enum';
import { OmitType } from '@nestjs/swagger';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Allow } from 'class-validator';
export class CreateTutorDto extends OmitType(Tutor, [
  'createdAt',
  'deletedAt',
  'id',
  'enabled',
  'locked',
  'updatedAt',
  'role',
  // 'students',
] as const) {}
