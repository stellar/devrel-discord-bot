import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ThreadChannel } from 'discord.js';

export class IsNotArchivedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    context.switchToHttp();
    const threadChannel: ThreadChannel = context.getArgByIndex(0);

    return !threadChannel.archived;
  }
}
