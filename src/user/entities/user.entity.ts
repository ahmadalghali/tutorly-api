import { Exclude } from 'class-transformer';
import { Allow, IsEmail } from 'class-validator';
import { Chat } from 'src/chat/entities/chat.entity';
import { BaseEntity } from 'src/global/base.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { UserRole } from '../enum/user-role.enum';

@Entity('user')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User extends BaseEntity {
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Allow()
  @Column()
  @Exclude()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  enabled = false;
  locked = false;

  profileImage: string;
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;
}

// isParent: boolean;
