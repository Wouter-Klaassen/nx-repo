import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User as UserModel, UserDocument } from './user.schema';

import { User, UserInfo } from '@nx-repo/data';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ){}

  async getAll(): Promise<UserInfo[]> {
    return this.userModel.aggregate([
    ]);
  }

  async getOne(userId: string): Promise<User | null> {
    const users = await this.userModel.aggregate([
        {$match: {
            id: userId,
        }},
    ]);

    return users[0];
  }
}
