import { User } from 'src/user/entities/user.entity';
import { OmitType } from '@nestjs/swagger';

export class LoginResponseDto extends OmitType(User, ['password'] as const) {}
