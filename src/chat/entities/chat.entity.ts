import { BaseEntity } from 'src/global/base.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  OneToMany,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat extends BaseEntity {
  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];
}
