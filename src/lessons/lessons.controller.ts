import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/enum/user-role.enum';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  // ADMIN ONLY
  @Roles([UserRole.ADMIN])
  @Patch('/:lessonId/enrol/students/:studentId')
  enrolStudentInLesson(
    @Param('studentId') studentId: number,
    @Param('lessonId') lessonId: number,
  ) {
    return this.lessonsService.enrolStudentInLesson(studentId, lessonId);
  }

  @Get()
  @Roles([UserRole.TUTOR, UserRole.STUDENT])
  getMyLessons(@Req() req) {
    return this.lessonsService.getMyLessons(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
