import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MeService } from './me.service';
import { UpdateMeDto } from './dto/update-me.dto';
import { Request } from 'express';
import { GetUserId } from 'src/auth/decorators/get-user-id.decorator';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  getMe(@GetUser() user) {
    return this.meService.getMe(user.id);
  }

  // @Patch()
  // updateMe(@Param('id') id: string, @Body() updateMeDto: UpdateMeDto) {
  //   return this.meService.updateMe(+id, updateMeDto);
  // }

  // @Delete()
  // removeMe() {
  //   return this.meService.removeMe(+id);
  // }
}
