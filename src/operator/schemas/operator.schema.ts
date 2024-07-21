import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  RoleEnum,
  ActiveStatusEnum,
  ACTIVE,
} from 'src/common/constants/app.constants';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

export type OperatorDocument = HydratedDocument<Operator>;

@Schema()
export class Operator {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({})
  fullName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({})
  lastLogin: Date;

  @Prop({ required: true, enum: RoleEnum })
  role: string;

  @Prop({ required: true, enum: ActiveStatusEnum, default: ACTIVE })
  activeStatus: string;

  @Prop({ required: true, default: false })
  isSuperAdmin: boolean;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);

// Pre hook for save
OperatorSchema.pre<OperatorDocument>('save', async function (next) {
  if (
    !this.isModified('password') &&
    (!this.isModified('firstName') || !this.isModified('lastName'))
  ) {
    return next();
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,20}$/;
  if (!passwordRegex.test(this.password)) {
    const error = new Error(
      'Password must contain one lowercase letter, one uppercase letter, one numeric character, and one special character.',
    );
    return next(error);
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Pre hook for findOneAndUpdate
OperatorSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as OperatorDocument;
  if (update.password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,20}$/;
    if (!passwordRegex.test(update.password)) {
      const error = new Error(
        'Password must contain one lowercase letter, one uppercase letter, one numeric character, and one special character.',
      );
      return next(error);
    }

    try {
      const hashedPassword = await bcrypt.hash(update.password, 10);
      update.password = hashedPassword;
      this.setUpdate(update);
      next();
    } catch (error) {
      next(error);
    }
  }
  if (update.firstName || update.lastName) {
    update.fullName = `${update.firstName} ${update.lastName}`;
    this.setUpdate(update);
    next();
  }
  next();
});
