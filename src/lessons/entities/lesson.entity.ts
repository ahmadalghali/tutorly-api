import { CrudBaseEntity } from 'src/global/base.entity';
import { SubjectLevel } from './../../subjects/entities/subject-level.entity';
import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Student } from 'src/student/entities/student.entity';

@Entity()
export class Lesson extends CrudBaseEntity {
  @ManyToOne(() => Subject, { eager: true })
  subject: Subject;

  @ManyToOne(() => SubjectLevel, { eager: true })
  level: SubjectLevel;

  @ManyToOne(() => Tutor)
  tutor: Tutor;

  @ManyToMany(() => Student, { eager: true })
  @JoinTable({ name: 'lesson_students' })
  students: Student[];
}
