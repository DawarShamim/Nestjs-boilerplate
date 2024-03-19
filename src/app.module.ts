import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstController } from './first/first.controller';

@Module({
  imports: [],
  controllers: [AppController, FirstController],
  providers: [AppService],
})
export class AppModule {}
