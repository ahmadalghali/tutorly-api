import { Student } from 'src/student/entities/student.entity';
import { AuthModule } from './../auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { Tutor } from './entities/tutor.entity';
import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor, Student]), UserModule, AuthModule],
  controllers: [TutorController],
  providers: [TutorService],
})
export class TutorModule {}
