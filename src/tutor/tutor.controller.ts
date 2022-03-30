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
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/enum/user-role.enum';

@Controller('tutors')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Roles([UserRole.ADMIN])
  @Post()
  registerTutor(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorService.registerTutor(createTutorDto);
  }

  @Get()
  findAll() {
    return this.tutorService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tutorService.findOne(+id);
  // }

  @Roles([UserRole.TUTOR])
  @Get('my-students')
  getStudents(@Req() req) {
    return this.tutorService.getStudents(req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {
    return this.tutorService.update(+id, updateTutorDto);
  }

  @Roles([UserRole.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorService.remove(+id);
  }
}
