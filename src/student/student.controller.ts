import { UserRole } from 'src/user/enum/user-role.enum';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // @Post()
  // register(@Body() createStudentDto: CreateStudentDto) {
  //   return this.studentService.register(createStudentDto);
  // }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  // ADMIN ONLY
  @Roles([UserRole.ADMIN])
  @Patch(':studentId/assign-tutor/:tutorId')
  assignTutorToStudent(
    @Param('studentId') studentId: number,
    @Param('tutorId') tutorId: number,
  ) {
    return this.studentService.assignTutorToStudent(studentId, tutorId);
  }

  @Roles([UserRole.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
