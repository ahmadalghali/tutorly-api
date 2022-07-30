import { Student } from 'src/student/entities/student.entity';
import { Lesson } from './entities/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Student])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
