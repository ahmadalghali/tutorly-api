import { CrudBaseEntity } from 'src/global/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { Chat } from 'src/chat/entities/chat.entity';
import { Allow } from 'class-validator';

@Entity()
export class Message extends CrudBaseEntity {
  @Allow()
  @Column()
  text: string;

  @ManyToOne(() => User, { nullable: false, eager: true })
  sender: User;

  @ManyToOne(() => User, { nullable: false, eager: true })
  receiver: User;

  @Allow()
  @Column({ default: false })
  seen: boolean;

  // @ManyToOne(() => Chat, (chat) => chat.messages, { nullable: false })
  // chat: Chat;
}
