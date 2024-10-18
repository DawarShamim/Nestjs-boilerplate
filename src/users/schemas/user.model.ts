import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

// Define the User interface which extends Document
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  // Ensure User extends Document
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  tenantId: string;

  // Add more properties as needed
}

// Create the UserSchema from the User class
export const UserSchema = SchemaFactory.createForClass(User);
