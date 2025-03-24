import {
  Controller,
  Get,
  Logger,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { DiscordAuthGuard } from './auth/discord.guard';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private authService: AuthService) {}

  @UseGuards(DiscordAuthGuard)
  @Get('oauth2/discord')
  discordOauth(@Request() req) {
    return req.user;
  }

  @Get('callback')
  callback(@Request() req, @Response() res) {
    return res.redirect(
      302,
      `https://discord.com/oauth2/authorize?client_id=1309255291048558632`,
    );
  }
}
