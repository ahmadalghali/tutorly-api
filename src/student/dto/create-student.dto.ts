import { UserRole } from 'src/user/enum/user-role.enum';
import { Student } from 'src/student/entities/student.entity';
import { OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto extends OmitType(Student, [
  'createdAt',
  'deletedAt',
  'enabled',
  'id',
  'locked',
  'updatedAt',
  'profileImageUrl',
  'role',
  'tutors',
] as const) {}
