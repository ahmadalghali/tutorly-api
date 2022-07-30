import { Exclude } from 'class-transformer';
import { Allow, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { CrudBaseEntity } from 'src/global/base.entity';
import { Column, Entity, TableInheritance } from 'typeorm';
import { UserRole } from '../enum/user-role.enum';

@Entity('user')
// @TableInheritance()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User extends CrudBaseEntity {
  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  // @MinLength(6)
  @Exclude()
  @Column()
  password: string;

  @Allow()
  @Column()
  firstname: string;

  @Allow()
  @Column()
  lastname: string;

  @Column({
    default: false,
  })
  enabled: boolean;

  @Column({
    default: false,
  })
  locked: boolean;

  @Allow()
  @Column({ nullable: true })
  profileImageUrl?: string;

  @Allow()
  @Column()
  phoneNumber: string;

  @Allow()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;
}
