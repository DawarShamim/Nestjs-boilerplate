import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.model'; // Import the User model from user.model.ts

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User | null> {
    // Find user by username
    const existingUser: User | null = await this.userModel
      .findOne({ username })
      .exec();
    return existingUser;
  }

  // Additional methods can be added here as needed
}
