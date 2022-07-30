import { Allow } from 'class-validator';
import { CrudBaseEntity } from 'src/global/base.entity';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  OneToMany,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Chat extends CrudBaseEntity {
  // @Allow()
  // @OneToMany(() => Message, (message) => message.chat)
  // messages: Message[];

  // @ManyToMany(() => User, { nullable: false })
  // @JoinTable()
  // members: User[];

  @ManyToOne(() => User, { nullable: false })
  tutor: User;

  @ManyToOne(() => User, { nullable: false })
  student: User;
}
