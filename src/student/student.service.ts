import { User } from 'src/user/entities/user.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Student } from 'src/student/entities/student.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { UserRole } from 'src/user/enum/user-role.enum';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Tutor) private tutorRepository: Repository<Tutor>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async assignTutorToStudent(
    studentId: number,
    tutorId: number,
  ): Promise<Student> {
    const student = await this.studentRepository.findOne(studentId);

    if (!student) throw new BadRequestException('Student not found');

    const tutor = await this.tutorRepository.findOne(tutorId);

    if (!tutor) throw new BadRequestException('Tutor not found');

    student.tutors.push(tutor);

    return await this.studentRepository.save(student);
  }
  async register(createStudentDto: CreateStudentDto) {
    return await this.studentRepository.save({
      ...createStudentDto,
      role: UserRole.STUDENT,
    });
  }

  findAll() {
    return `This action returns all student`;
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne(id);
    if (!student) throw new BadRequestException('Student not found');

    return student;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
