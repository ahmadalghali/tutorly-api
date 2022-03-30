import { User } from 'src/user/entities/user.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Student } from './entities/student.entity';
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Tutor, User])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
