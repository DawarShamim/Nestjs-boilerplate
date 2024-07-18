import { Document } from 'mongoose';
import {
  Prop,
  Schema as MongooseSchema,
  SchemaFactory,
} from '@nestjs/mongoose';

@MongooseSchema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  publicationDate: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
