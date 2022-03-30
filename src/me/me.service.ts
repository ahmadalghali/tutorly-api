import { Student } from 'src/student/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateMeDto } from './dto/update-me.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/user/enum/user-role.enum';
import { Admin } from 'src/admin/entities/admin.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Tutor) private tutorRepository: Repository<Tutor>,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}
  async getMe(user: User) {
    let res;
    switch (user.role) {
      case UserRole.STUDENT:
        res = await this.studentRepository.findOne(user.id);
        break;
      case UserRole.TUTOR:
        res = await this.tutorRepository.findOne(user.id);
        break;
      case UserRole.ADMIN:
        res = await this.adminRepository.findOne(user.id);
        break;
      default:
        res = await this.userRepository.findOne(user.id);
    }

    return res;
  }

  // updateMe(id: number, updateMeDto: UpdateMeDto) {
  //   return `This action updates a #${id} me`;
  // }

  // removeMe(id: number) {
  //   return `This action removes a #${id} me`;
  // }
}
