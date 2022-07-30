import { User } from 'src/user/entities/user.entity';
import { ChildEntity, Column, Entity } from 'typeorm';

@ChildEntity()
// @Entity()
export class Admin extends User {}
