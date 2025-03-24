import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ChannelType } from 'discord.js';

export class IsPublicThreadChannelType implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const channel = context.getArgByIndex(0);

    return channel.type === ChannelType.PublicThread;
  }
}
