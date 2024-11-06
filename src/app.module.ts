import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './utils/middleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SocketGateway } from './socket/socket.gateway';
import { MailModule } from './mail/mail.module';
import { OperatorController } from './controllers/operator.controller';
import { OperatorService } from './services/operator.service';
import { Operator, OperatorSchema } from './schemas/operator.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the module globally available
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Operator.name, schema: OperatorSchema },
    ]),
    AuthModule,
    UsersModule,

    MailModule,
  ],
  controllers: [AppController, OperatorController],
  providers: [AppService, SocketGateway, OperatorService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
