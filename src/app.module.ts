import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/entities/todo.entity';
import { AuthMiddleware } from './todo/middlewares/auth.middleware';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { CvEntity } from "./cv/entities/cv.entity";
import { SkillEntity } from "./skill/entities/skill.entity";
import { UserEntity } from "./user/entities/user.entity";

@Module({
  imports: [
    PremierModule,
    TodoModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        'dist/**/*.entity.ts',
        TodoEntity,
        CvEntity,
        SkillEntity,
        UserEntity,
      ],
      synchronize: true,
    }),
    CvModule,
    UserModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'todo/add', method: RequestMethod.POST },
        { path: 'todo', method: RequestMethod.DELETE },
        { path: 'todo', method: RequestMethod.PATCH },
      );
  }
}
