import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model'; // Import the User model from user.model.ts

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User | undefined> {
    const existingUser: User | undefined = await this.userModel.findOne({
      username,
    });
    return existingUser;
  }
}
