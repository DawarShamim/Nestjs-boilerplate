import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';
import { Operator, OperatorSchema } from './schemas/operator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operator.name, schema: OperatorSchema },
    ]),
  ],
  controllers: [OperatorController],
  providers: [OperatorService],
})
export class OperatorModule {}
