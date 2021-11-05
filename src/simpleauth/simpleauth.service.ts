import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SimpleAuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async login(username, password) {
    const user = await this.userModel.findOne({
      username: username,
      password: password,
    });
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async addUser() {
    const newUser = new this.userModel({
      username: 'test',
      password: 'pmo',
    });
    try {
      await newUser.save();
    } catch (error) {
      throw error;
    }
  }
}
