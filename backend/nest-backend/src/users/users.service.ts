import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  async findUserByEmail(email: string) {
    return this.usersRepository.findUserByEmail(email);
  }

  async findUserById(userId: string) {
    return this.usersRepository.findUserById(userId);
  }

  async findUserByIdAndUpdate(userId: string, updateUserDto: Partial<User>) {
    return this.usersRepository.findUserByIdAndUpdate(userId, updateUserDto);
  }
}
