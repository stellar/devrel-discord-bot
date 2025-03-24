import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './discord-strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        defaultStrategy: 'discord-0auth',
        clientID: configService.get('CLIENT_ID'),
        clientSecret: configService.get('CLIENT_SECRET'),
        session: true,
        property: 'messages.read',
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [AuthService, DiscordStrategy, JwtService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
