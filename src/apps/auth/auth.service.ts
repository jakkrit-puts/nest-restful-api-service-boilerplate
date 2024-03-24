import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.username);
    const match = await bcrypt.compareSync(loginDto.password, user.password);

    if (!match) {
      throw new HttpException('password invalid', HttpStatus.BAD_REQUEST);
    }

    const payload = { username: user.username, id: user.id, roles: user.role };

    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
