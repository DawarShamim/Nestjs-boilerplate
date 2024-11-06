import { Document } from 'mongoose';

export interface IOperator extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly fullName: string;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly lastLogin: string;
  readonly role: string;
  readonly isSuperAdmin: boolean;
}
