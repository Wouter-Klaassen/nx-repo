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
    return this.userModel.find();
  }

  async getOne(userId: string) {
    const user = await this.userModel.findById(userId);

    return user;
  }

  async getOne_(_id: string){
    const user = await this.userModel.findOne({
      id : _id
    })
    return user
  }

}
