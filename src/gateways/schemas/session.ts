import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OperatorDocument = HydratedDocument<Operator>;

@Schema()
export class Operator {
  @Prop({ required: true, Ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  expiry: string;

  @Prop({})
  mobileSession: boolean;

  @Prop({ required: true })
  username: string;

  }

export const OperatorSchema = SchemaFactory.createForClass(Operator);
