import { BaseEntity } from 'src/global/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Message extends BaseEntity {
  @Column()
  text: string;

  @ManyToOne(() => User)
  from: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
