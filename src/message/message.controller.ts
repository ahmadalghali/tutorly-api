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
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  sendMessage(@Body() createMessageDto: CreateMessageDto, @Req() req) {
    return this.messageService.create(req.user.id, createMessageDto);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get('user/:userId')
  findAllMessagesWithUser(@Param('userId') userId: number, @Req() req) {
    console.log('req.user.id :>> ', req.user.id);
    console.log('userId :>> ', userId);
    return this.messageService.findMessageHistoryWithUser(userId, req.user);
  }

  // @Get('/im')
  // findAllMessagesWithTutor(@Param('tutorId') tutorId: number, @Req() req) {
  //   console.log('req.user.id :>> ', req.user.id);
  //   console.log('tutorId :>> ', tutorId);
  //   return this.messageService.findMessageHistoryWithTutor(tutorId, req.user);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
