import { OmitType, PartialType } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends OmitType(PartialType(CreateStudentDto), [
  'email',
  'password',
] as const) {
  @Allow()
  tutorsIds: number[];
}
