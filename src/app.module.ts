import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { GatewayIntentBits, Partials } from 'discord.js';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { SERVER_ID } from './constants';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
    UsersModule,
    PassportModule,
    HttpModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
