import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Client, Message, messageLink, ThreadChannel } from 'discord.js';
import { HttpService } from '@nestjs/axios';
import { IsNotArchivedGuard } from './guard/is-not-archived.guard';
import { IsDevHelpChannel } from './guard/is-dev-help-channel-type.guard';
import { IsPublicThreadChannelType } from './guard/is-thread-channel-type.guard';
import { ConfigService } from '@nestjs/config';
import { ForumTag, getTagById } from '../constants';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  private readonly debug: boolean = true;

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(
      `Bot Tag: ${this.client.user.tag} Id: ${this.client.user.id} was started at ${this.client.readyAt}`,
    );
    this.debugInfo();
  }

  @UseGuards(IsNotArchivedGuard, IsDevHelpChannel, IsPublicThreadChannelType)
  @On('threadCreate')
  async onMessage(channel: ThreadChannel): Promise<void> {
    const messages = await channel.awaitMessages({ max: 1 });

    if (messages.size === 0) return;

    const forumMsg: Message = messages.at(0);

    const title = channel.name;

    const tags: ForumTag[] = channel.appliedTags
      .filter((tag) => tag.length > 0)
      .map((value) => getTagById(value));

    let tagString: string = '';
    tags.forEach((value) => {
      tagString += '`' + value.name + '`';
    });

    this.httpService
      .post(
        this.configService.get<string>('DEV_HELP_SLACK_WEBHOOK'),
        {
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: `:discord: ${title}`,
              },
            },
            {
              type: 'context',
              elements: [
                {
                  text: `*${forumMsg.createdAt}*  |  ${forumMsg.author.username}`,
                  type: 'mrkdwn',
                },
              ],
            },
            {
              type: 'divider',
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `${forumMsg.content}`,
              },
            },
            {
              type: 'divider',
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `:tag: ${tagString}`,
                },
              ],
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `:link: ${messageLink(channel.id, forumMsg.id)}`,
                },
              ],
            },
          ],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .subscribe((value) => {
        this.logger.debug(`Sent Request - ${value.request}`);
        this.logger.debug(`Received ${value.status} ${value.statusText}`);
      });
  }

  private debugInfo() {
    if (this.debug) {
      this.client.rest.handlers.forEach((command) => {
        this.logger.debug(`Registered handler - ${command.id}`);
      });

      this.client.application.flags.toArray().forEach((flag) => {
        this.logger.debug(`Registered flag - ${flag}`);
      });
    }
  }
}
