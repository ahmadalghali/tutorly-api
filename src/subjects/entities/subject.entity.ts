import { CrudBaseEntity } from 'src/global/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Subject extends CrudBaseEntity {
  @Column()
  name: string;
}
