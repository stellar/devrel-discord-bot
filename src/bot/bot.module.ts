import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot.gateway';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GetStellaStatsCommand } from './get-stella-stats.command';

@Module({
  imports: [DiscordModule.forFeature(), HttpModule, ConfigModule],
  providers: [BotGateway, GetStellaStatsCommand],
})
export class BotModule {}
