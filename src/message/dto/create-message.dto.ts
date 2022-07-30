import { Message } from './../entities/message.entity';
import { OmitType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
export class CreateMessageDto extends OmitType(Message, [
  'createdAt',
  'deletedAt',
  'updatedAt',
  // 'chat',
  'id',
  'sender',
  'receiver',
  // 'receiver',
] as const) {
  // @IsNumber()
  // senderId: number;
  @IsNumber()
  receiverId: number;
  // @IsNumber()
  // chatId: number;
}

// let test: CreateMessageDto;
