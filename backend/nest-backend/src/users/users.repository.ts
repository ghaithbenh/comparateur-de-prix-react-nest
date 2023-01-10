import { CreateUserDto } from './../dto/CreateUser.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = new this.user(createUserDto);
    return user.save();
  }

  async findUserByEmail(email: string) {
    const user = await this.user.findOne({
      email,
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findUserById(userId: string) {
    const user = await this.user.findOne({
      _id: userId,
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findUserByIdAndUpdate(userId: string, updateUserDto: Partial<User>) {
    return this.user.findOneAndUpdate(
      {
        _id: userId,
      },
      updateUserDto,
    );
  }
}
