import { CanActivate, ExecutionContext } from '@nestjs/common';
import { DEV_HELP_CHANNEL } from '../../constants';

export class IsDevHelpChannel implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const channel = context.getArgByIndex(0);

    return channel.parentId === DEV_HELP_CHANNEL;
  }
}
