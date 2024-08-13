import { Module } from '@nestjs/common';
import { MyGateway } from './my.gateway';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [ServicesModule],
  providers: [MyGateway],
})
export class GatewaysModule {}
