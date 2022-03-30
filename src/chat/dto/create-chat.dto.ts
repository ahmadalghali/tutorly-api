import { OmitType } from '@nestjs/swagger';
import { Allow, ArrayMaxSize, ArrayMinSize, MaxLength } from 'class-validator';
import { Chat } from '../entities/chat.entity';

export class CreateChatDto extends OmitType(Chat, [
  'id',
  'createdAt',
  'deletedAt',
  'updatedAt',
  'createdAt',
  'student',
  'tutor',
  //   'members',
] as const) {
  @Allow()
  userId: number;
  //   @ArrayMaxSize(2)
  //   @ArrayMinSize(2)
  //   membersIds: number[];
}
