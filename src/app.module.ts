import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { GatewayIntentBits, Partials } from 'discord.js';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { SERVER_ID } from './constants';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.dev', '.env.ci'],
      isGlobal: true,
    }),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('DISCORD_TOKEN'),
        registerCommandOptions: [
          {
            forGuild: SERVER_ID,
            removeCommandsBefore: true,
          },
        ],
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessagePolls,
            GatewayIntentBits.GuildMembers,
          ],
          partials: [
            Partials.Channel,
            Partials.User,
            Partials.Message,
            Partials.ThreadMember,
            Partials.GuildMember,
          ],
        },
        autoLogin: true,
        failOnLogin: true,
      }),
    }),
    BotModule,
    PassportModule,
    HttpModule,
  ],
  controllers: [],
})
export class AppModule {}
