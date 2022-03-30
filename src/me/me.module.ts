import { Student } from 'src/student/entities/student.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Admin } from './../admin/entities/admin.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, Tutor, Student]),
    UserModule,
  ],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
