import { UserRole } from 'src/user/enum/user-role.enum';
import { Student } from 'src/student/entities/student.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LessonsService {
  constructor(
    // @InjectRepository(Tutor) tutorRepo: Repository<Tutor>
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}
  async getMyLessons(user: User) {
    if (user.role === UserRole.TUTOR) {
      return await this.lessonRepo.find({
        where: {
          tutor: {
            id: user.id,
          },
        },
      });
    } else if (user.role === UserRole.STUDENT) {
      return await this.lessonRepo
        .createQueryBuilder('lesson')
        .leftJoinAndSelect('lesson.students', 'student')
        .where('student.id = :studentId', { studentId: user.id })
        .getMany();
    }
  }

  async enrolStudentInLesson(studentId: number, lessonId: number) {
    const lesson: Lesson = await this.lessonRepo.findOne(lessonId);
    const student: Student = await this.studentRepo.findOne(studentId);
    lesson.students.push(student);
    return this.lessonRepo.save(lesson);
  }

  create(createLessonDto: CreateLessonDto) {
    return 'This action adds a new lesson';
  }

  findAll() {
    return `This action returns all lessons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
