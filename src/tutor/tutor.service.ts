import { Student } from 'src/student/entities/student.entity';
import { AuthService } from './../auth/auth.service';
import { UserService } from 'src/user/user.service';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/user/enum/user-role.enum';
import { In, Repository } from 'typeorm';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor } from './entities/tutor.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TutorService {
  constructor(
    @InjectRepository(Tutor) private tutorRepository: Repository<Tutor>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private userService: UserService,
    private authService: AuthService,
  ) {}
  async getStudents(tutorId: number) {
    const students: Student[] = await this.studentRepository
      .createQueryBuilder('student')
      .innerJoin('student.tutors', 'tutor')
      .where('tutor.id = :tutorId', { tutorId })
      .getMany();
    return students;
  }

  async registerTutor(createTutorDto: CreateTutorDto): Promise<Tutor> {
    const { email, password } = createTutorDto;

    this.authService.checkUserExists(email);

    createTutorDto.password = await this.authService.hashPassword(password);

    const newTutor = {
      ...createTutorDto,
      role: UserRole.TUTOR,
    };
    return await this.tutorRepository.save(newTutor);
  }

  findAll() {
    return `This action returns all tutor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tutor`;
  }

  update(id: number, updateTutorDto: UpdateTutorDto) {
    return `This action updates a #${id} tutor`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutor`;
  }
}
