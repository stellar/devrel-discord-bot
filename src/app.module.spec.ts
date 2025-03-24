import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { UsersService } from './users/users.service';
import { BotGateway } from './bot/bot.gateway';
import { ConfigService } from '@nestjs/config';

describe('AppModule Integration', () => {
  let appModule: TestingModule;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  beforeEach(async () => {
    const configServiceMock = {
      get: jest.fn((key: string) => {
        if (key === 'CLIENT_ID') {
          return 'mock-client-id';
        } else if (key === 'CLIENT_SECRET') {
          return 'mock-client-secret';
        }
        return null;
      }),
    };

    appModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
  });

  it('should import AppModule without errors', () => {
    expect(appModule).toBeDefined();
  });

  it('should provide AppController', () => {
    const appController = appModule.get<AppController>(AppController);
    expect(appController).toBeDefined();
  });

  it('should provide UsersService', () => {
    const usersService = appModule.get<UsersService>(UsersService);
    expect(usersService).toBeDefined();
  });

  it('should provide BotGateway', () => {
    const botGateway = appModule.get<BotGateway>(BotGateway);
    expect(botGateway).toBeDefined();
  });
});
