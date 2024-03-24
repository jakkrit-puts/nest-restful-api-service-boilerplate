import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const saltRounds = 10;

      const user = new User()
      user.first_name = createUserDto.first_name
      user.last_name = createUserDto.last_name
      user.username = createUserDto.username
      user.password = bcrypt.hashSync(createUserDto.password, saltRounds);

      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException('Username already exist.', HttpStatus.CONFLICT)
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: {id} })
    if(!user) {
      throw new NotFoundException()
    }
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({ 
      select: ['id', 'password', 'role', 'username'],
      where: { username } })
    if(!user) {
      throw new NotFoundException('Username Not Found.')
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: {id} })
    if(!user) {
      throw new NotFoundException()
    }
    return this.usersRepository.delete(id)
    // return this.usersRepository.remove(user)
  }
}
