import { Allow } from 'class-validator';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { User } from 'src/user/entities/user.entity';
import { UserRole } from 'src/user/enum/user-role.enum';
import { ChildEntity, Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@ChildEntity()
// @Entity()
export class Student extends User {
  @Column()
  isParent: boolean;

  @ManyToMany(() => Tutor, { eager: true })
  @JoinTable({ name: 'student_tutors' })
  tutors: Tutor[];

  @Allow()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;
}
