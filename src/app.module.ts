import { SubjectLevel } from './subjects/entities/subject-level.entity';
import { Subject } from './subjects/entities/subject.entity';
import { ChatModule } from './chat/chat.module';
import { BookingModule } from './booking/booking.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { TutorModule } from './tutor/tutor.module';
import { Booking } from './booking/entities/booking.entity';
import { Admin } from './admin/entities/admin.entity';
import { Student } from './student/entities/student.entity';
import { Tutor } from './tutor/entities/tutor.entity';
import { Chat } from './chat/entities/chat.entity';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { AccessTokenGuard } from './auth/guard/access-token.guard';
import { User } from './user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MeModule } from './me/me.module';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { RolesGuard } from './auth/guard/role.guard';
import { SubjectsModule } from './subjects/subjects.module';
import { LessonsModule } from './lessons/lessons.module';
import { Lesson } from './lessons/entities/lesson.entity';
import { HealthController } from './health/health.controller';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      url:
        process.env.NODE_ENV === 'production'
          ? process.env.JAWSDB_URL
          : process.env.LOCAL_DATABASE_URL,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      entities: [
        User,
        Chat,
        Message,
        Tutor,
        Student,
        Admin,
        Booking,
        Subject,
        SubjectLevel,
        Lesson,
      ],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    MeModule,
    TutorModule,
    StudentModule,
    AdminModule,
    BookingModule,
    ChatModule,
    MessageModule,
    SubjectsModule,
    LessonsModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
