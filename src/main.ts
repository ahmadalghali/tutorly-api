import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import * as csurf from 'csurf';
import helmet from 'helmet';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as connectRedis from 'connect-redis';
import { createClient } from 'redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('London Tuition Academy Api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const RedisStore = connectRedis(session);
  const redisClient = createClient({ legacyMode: true });

  await redisClient
    .connect()
    .then(() => console.log('Redis connected.'))
    .catch(console.error);

  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000', 'https://localhost:3000'],
    credentials: true,
  });

  app.use(
    session({
      name: 'LTA_SESSION_ID',
      store: new RedisStore({ client: redisClient as any, disableTouch: true }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 Year
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'strict',
        httpOnly: true,
      },
    }),
  );
  // app.use(helmet());

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
}
bootstrap();
