import { UserRole } from 'src/user/enum/user-role.enum';
import { OmitType } from '@nestjs/swagger';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import { ChildEntity, Column, Entity, ManyToMany } from 'typeorm';
import { Allow } from 'class-validator';
import { Subject } from 'src/subjects/entities/subject.entity';

@ChildEntity()
// @Entity()
export class Tutor extends User {
  // @ManyToMany(() => Student)
  // students: Student[];

  @Allow()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TUTOR,
  })
  role: UserRole;

  @ManyToMany(() => Subject)
  subjects: Subject[];
}
