import { User } from 'src/user/entities/user.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Student extends User {
  @Column()
  isParent: boolean;
}
