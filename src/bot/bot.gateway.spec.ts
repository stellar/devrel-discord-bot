import { Test, TestingModule } from '@nestjs/testing';
import { BotGateway } from './bot.gateway';
import { Client, GatewayIntentBits } from 'discord.js';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { IsNotArchivedGuard } from './guard/is-not-archived.guard';
import { IsDevHelpChannel } from './guard/is-dev-help-channel-type.guard';
import { IsPublicThreadChannelType } from './guard/is-thread-channel-type.guard';
import { of } from 'rxjs';
import { Logger } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core'; // Import DiscordModule

describe('BotGateway', () => {
  let gateway: BotGateway;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let client: Client;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let httpService: HttpService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  beforeEach(async () => {
    // Create mocks
    const clientMock = {
      user: {
        tag: 'TestBot#1234',
        id: '123',
      },
      readyAt: new Date(),
      rest: {
        handlers: new Map(),
      },
      application: {
        flags: {
          toArray: () => true,
        },
      },
      on: jest.fn(),
      once: jest.fn(),
      guilds: {
        cache: {
          get: jest.fn().mockReturnValue({
            channels: {
              cache: {
                get: jest.fn().mockReturnValue({
                  isThread: () => true,
                  name: 'test-thread',
                }),
              },
            },
          }),
        },
      },
    };

    const httpServiceMock = {
      post: jest.fn(() =>
        of({
          data: {},
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }),
      ),
    };

    const configServiceMock = {
      get: jest.fn((key: string) => {
        if (key === 'DEV_HELP_SLACK_WEBHOOK') {
          return 'mock-webhook-url';
        }
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DiscordModule.forRootAsync({
          // Add DiscordModule to imports
          useFactory: () => ({
            token: 'test-token', // Provide a dummy token
            discordClientOptions: {
              intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
              ],
            },
          }),
        }),
      ],
      providers: [
        BotGateway,
        {
          provide: Client,
          useValue: clientMock,
        },
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        {
          provide: IsNotArchivedGuard,
          useValue: { canActivate: () => true }, // Mock guard
        },
        {
          provide: IsDevHelpChannel,
          useValue: { canActivate: () => true }, // Mock guard
        },
        {
          provide: IsPublicThreadChannelType,
          useValue: { canActivate: () => true }, // Mock guard
        },
      ],
    }).compile();

    gateway = module.get<BotGateway>(BotGateway);
    client = module.get<Client>(Client);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);

    jest.spyOn(Logger.prototype, 'log');
    jest.spyOn(Logger.prototype, 'debug');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
