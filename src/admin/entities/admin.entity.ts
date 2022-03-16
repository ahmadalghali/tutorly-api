import { User } from 'src/user/entities/user.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Admin extends User {}
