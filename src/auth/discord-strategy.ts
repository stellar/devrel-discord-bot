import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-auth0';
import e from 'express';

@Injectable()
export class DiscordStrategy extends PassportStrategy(
  Strategy,
  'discord-0auth',
) {
  constructor(private authService: AuthService) {
    super({
      clientID: authService.clientId,
      clientSecret: authService.clientSecret,
      callbackURL: 'http://localhost:3000/callback',
      domain: 'discord.com/oauth2',
      state: true,
      passReqToCallback: true,
      enableProof: true,
      scopeSeparator: '+',
      profileFields: ['identify', 'gateway.connect', 'messages.read'],
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    return user;
  }

  success(user: Express.User, info?: object) {
    super.success(user, info);
  }

  redirect(url: string, status?: number) {
    super.redirect(url, status);
  }

  authenticate(req: e.Request, options?: object) {
    super.authenticate(req, options);
  }
}
