import { PartialType } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class UpdateMeDto extends PartialType(User) {}
