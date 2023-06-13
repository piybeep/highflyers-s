import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        API_PORT: Joi.number().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        TYPEORM_HOST: Joi.string().required(),
        TYPEORM_USER: Joi.string().required(),
        TYPEORM_PASS: Joi.string().required(),
        TYPEORM_DB: Joi.string().required(),
        TYPEORM_PORT: Joi.number().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASS: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
        MAIL_TRANSPORT: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('TYPEORM_HOST'),
        username: config.get('TYPEORM_USER'),
        password: config.get('TYPEORM_PASS'),
        database: config.get('TYPEORM_DB'),
        port: config.get('TYPEORM_PORT'),
        entities: [__dirname + 'dist/**/*.entity.{t,j}.s'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    UsersModule,
    AuthModule,
    EmailModule,
    // CardsModule,
  ],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
