import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User as UserModel, UserDocument } from './user.schema';

import { User, UserInfo } from '@nx-repo/data';
import { Neo4jService } from '../../neo4j/neo4j.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private readonly neo4jService: Neo4jService
  ){}

  async getAll(): Promise<UserInfo[]> {
    return this.userModel.find();
  }

  async getOne(userId: string) {
    const user = await this.userModel.findById(userId);

    return user;
  }


}
