/* create-embedded-msg.command.ts */

import { Command, Handler, InjectDiscordClient } from '@discord-nestjs/core';
import {
  APIEmbed,
  ApplicationCommandType,
  BaseMessageOptions,
  Client,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  JSONEncodable,
} from 'discord.js';
import { Injectable, Logger } from '@nestjs/common';
import { SERVER_ID, STELLA_CHANNEL } from '../constants';

@Command({
  name: 'get-stella-stats',
  description: 'Displays Stella stats',
  type: ApplicationCommandType.ChatInput,
})
@Injectable()
export class GetStellaStatsCommand {
  private readonly logger = new Logger(GetStellaStatsCommand.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Handler()
  async createMessage(interaction: CommandInteraction): Promise<void> {
    const stats = await this.getStellaStats();

    const responseEmbed: JSONEncodable<APIEmbed> = new EmbedBuilder()
      .setTitle('Stella Stats')
      .setURL('https://developers.stellar.org')
      .setImage(`${this.client.user.avatarURL()}`)
      .setColor(Colors.Yellow)
      .setDescription('Stella Weekly Stats')
      .setTimestamp()
      .addFields({
        name: 'Weekly Top Level Questions',
        value: `${stats}`,
        inline: true,
      });

    const options: BaseMessageOptions = {
      content: `Stella Stats`,
      embeds: [responseEmbed],
    };

    await interaction.reply(options);
  }

  private async getStellaStats(): Promise<number> {
    let count = 0;
    await this.client.guilds.fetch(SERVER_ID).then((guild) => {
      guild.channels.fetch(STELLA_CHANNEL).then((value) => {
        if ('threads' in value) {
          value.threads.valueOf().forEach((thread) => {
            const date = new Date();
            date.setDate(date.getDate() - 7);

            if (thread.createdAt <= new Date() && thread.createdAt >= date) {
              count++;
            }
          });

          return count;
        }
      });
    });

    return count;
  }
}
