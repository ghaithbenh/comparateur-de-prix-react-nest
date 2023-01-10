import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

export interface JwtPayloadWithRt {
  sub: string;
  email: string;
  refreshToken: string;
}

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt_secret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayloadWithRt) {
    // Bearer 45465465456465465465465465465
    const refreshToken = req.headers.authorization.split(' ')[1];

    return {
      ...payload,
      refreshToken,
    };
  }
}
