import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/apps/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_KEY_SECRET"),
    });
  }

  async validate(payload: any) {    
    const user = await this.usersService.findOne(+payload.id); // + cast string -> number
    if (!user) {
      throw new NotFoundException('User Not Found.');
    }

    return {
      id: user.id,
      username: user.username,
      roles: user.role,
    };
  }
}
