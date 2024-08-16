import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Singleton } from '../singleton';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const singleton = Singleton.getInstance();
    singleton.set({
      user: {
        user_id: payload.user_id,
        email: payload.email,
      },
    });

    return {
      user_id: payload.user_id,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
    };
  }
}
