import { CanActivate, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DiscordAuthGuard
  extends AuthGuard('discord-0auth')
  implements CanActivate {}
