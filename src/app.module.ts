import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import * as Joi from 'joi';
import { APP_GUARD } from '@nestjs/core';
import { AdminOnlyGuard } from './common/guards/adminOnly.guard';
import { CategoriesModule } from './categories/categories.module';
import { ShowcasesModule } from './showcase/showcases.module';
import { CardsModule } from './cards/cards.module';
import { LessonPlansModule } from './lesson-plans/lesson-plans.module';
import { LevelsModule } from './levels/levels.module';
import { CheckListsModule } from './check-lists/check-lists.module';
import { LearningResourcesModule } from './learning-resources/learning-resources.module';
import { TedTalksModule } from './ted-talks/ted-talks.module';
import { TagsModule } from './tags/tags.module';

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
                GOOGLE_CLIENT_ID: Joi.string().required(),
                GOOGLE_CLIENT_SECRET: Joi.string().required(),
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
        CategoriesModule,
        ShowcasesModule,
        CardsModule,
        LessonPlansModule,
        LevelsModule,
        CheckListsModule,
        LearningResourcesModule,
        TedTalksModule,
        TagsModule,
    ],
    providers: [EmailService, { provide: APP_GUARD, useClass: AdminOnlyGuard }],
})
export class AppModule {}
