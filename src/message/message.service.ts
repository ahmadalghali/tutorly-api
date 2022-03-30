import { User } from 'src/user/entities/user.entity';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/chat/entities/chat.entity';
import { In, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findMessageHistoryWithUser(
    userId: number,
    me: User,
  ): Promise<Message[]> {
    const messageHistoryWithUser: Message[] = await this.messageRepository.find(
      {
        where: {
          sender: {
            id: In([me.id, userId]),
          },
          receiver: {
            id: In([me.id, userId]),
          },
        },
      },
    );

    return messageHistoryWithUser;
  }

  async create(
    senderId: number,
    { text, receiverId }: CreateMessageDto,
  ): Promise<Message> {
    // const chat = await this.chatRepository.findOne({
    //   id: chatId,
    // });

    // if (!chat) throw new NotFoundException("Chat doesn't exist");

    if (senderId === receiverId)
      throw new BadRequestException('Cannot send message to self');

    const sender = await this.userRepository.findOne(senderId);
    if (!sender) throw new NotFoundException('Sender doesnt exist');

    const receiver = await this.userRepository.findOne(receiverId);
    if (!receiver) throw new NotFoundException('Receiver doesnt exist');

    const message = new Message();
    // message.chat = chat;
    message.sender = sender;
    message.text = text;
    message.receiver = receiver;
    return await this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  findAllMessages() {
    return this.messageRepository.find();
  }

  messageWithUserExists(userId: number) {
    this.messageRepository;
  }

  findOne(id: number) {
    return this.messageRepository.findOne(id);
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
