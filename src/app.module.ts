import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join, resolve } from 'path';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { CategoriesModule } from './categories/categories.module';
import { CheckListsModule } from './check-lists/check-lists.module';
import { AdminOnlyGuard } from './common/guards/adminOnly.guard';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { ExamContentModule } from './exam-content/exam-content.module';
import { ExamsModule } from './exams/exams.module';
import { FilesModule } from './files/files.module';
import { LearningResourcesGroupsModule } from './learning-resources-groups/learning-resources-groups.module';
import { LearningResourcesModule } from './learning-resources/learning-resources.module';
import { LessonPlansModule } from './lesson-plans/lesson-plans.module';
import { LevelsModule } from './levels/levels.module';
import { ShowcasesModule } from './showcase/showcases.module';
import { TagsModule } from './tags/tags.module';
import { TedTalksModule } from './ted-talks/ted-talks.module';
import { TestAnswersModule } from './test-answers/test-answers.module';
import { TestContentModule } from './test-content/test-content.module';
import { TestsModule } from './tests/tests.module';
import { UsersModule } from './users/users.module';

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
        ServeStaticModule.forRoot({
            rootPath: join(resolve(), 'uploads'),
            serveRoot: '/api/uploads',
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
        ExamsModule,
        ExamContentModule,
        ArticlesModule,
        TestsModule,
        TestContentModule,
        TestAnswersModule,
        LearningResourcesGroupsModule,
        FilesModule,
    ],
    providers: [EmailService, { provide: APP_GUARD, useClass: AdminOnlyGuard }],
})
export class AppModule {}
