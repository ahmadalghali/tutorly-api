import { User } from 'src/user/entities/user.entity';
import { MessageGateway } from './message.gateway';
import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/chat/entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat, User])],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
