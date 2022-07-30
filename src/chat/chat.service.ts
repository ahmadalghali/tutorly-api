import { Tutor } from './../tutor/entities/tutor.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create({ userId }: CreateChatDto, me: User) {
    const tutor: User = await this.userRepository.findOne(userId);

    if (!tutor) {
      throw new NotFoundException('Tutor not found');
    }

    //  check if both members are already in a chat
    const chat = await this.chatRepository.find({
      where: {
        tutor: {
          id: tutor.id,
        },
        student: {
          id: me.id,
        },
      },
    });

    // this.chatRepository
    //   .createQueryBuilder('chat')
    //   .leftJoinAndSelect('user', 'member')
    //   .where();

    if (chat) {
      console.log('chat :>> ', chat);
      throw new BadRequestException('Chat exists');
    }

    const newChat = new Chat();
    newChat.tutor = tutor;
    newChat.student = me;

    return await this.chatRepository.save(chat);
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
