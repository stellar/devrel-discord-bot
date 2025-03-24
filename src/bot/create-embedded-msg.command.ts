/* create-embedded-msg.command.ts */

import { Command, EventParams, Handler, On } from '@discord-nestjs/core';
import {
  ActionRowBuilder,
  APIEmbed,
  ApplicationCommandType,
  BaseMessageOptions,
  ClientEvents,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  JSONEncodable,
  MessagePayload,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { IsModalInteractionGuard } from './guard/is-modal-interaction.guard';

@Command({
  name: 'create-embedded-msg',
  description: 'Create Embedded Message',
  type: ApplicationCommandType.ChatInput,
})
@Injectable()
export class CreateEmbeddedMsgCommand {
  private readonly logger = new Logger(CreateEmbeddedMsgCommand.name);

  @Handler()
  async createMessage(interaction: CommandInteraction): Promise<void> {
    const modal = new ModalBuilder()
      .setTitle('Title')
      .setCustomId('modal-title');

    const firstInputComponent = new TextInputBuilder()
      .setMaxLength(1_00)
      .setCustomId('first-input')
      .setLabel('Field 1')
      .setStyle(TextInputStyle.Short);

    const secondInputComponent = new TextInputBuilder()
      .setMaxLength(1_000)
      .setCustomId('second-input')
      .setLabel('Field 2')
      .setStyle(TextInputStyle.Short);

    const thirdInputComponent = new TextInputBuilder()
      .setMaxLength(1_00)
      .setCustomId('third-input')
      .setLabel('Field 3')
      .setStyle(TextInputStyle.Short);

    const rows = [
      firstInputComponent,
      secondInputComponent,
      thirdInputComponent,
    ].map((component) =>
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        component,
      ),
    );

    modal.addComponents(...rows);

    await interaction.showModal(modal, {
      withResponse: true,
    });
  }

  @On('interactionCreate')
  @UseGuards(IsModalInteractionGuard)
  async onModuleSubmit(
    res,
    @EventParams() eventArgs: ClientEvents['interactionCreate'],
  ): Promise<InteractionResponse> {
    if (eventArgs.length <= 0) return;
    const modal = eventArgs[0];

    if (!modal.isModalSubmit()) return;

    const responseEmbed: JSONEncodable<APIEmbed> = new EmbedBuilder()
      .setTitle('A Message from Stella')
      .setURL('https://developers.stellar.org')
      .setImage(`${modal.user.avatarURL()}`)
      .setColor(Colors.Yellow)
      .setDescription('Thanks for going away')
      .setTimestamp()
      .addFields({
        name: 'Joined',
        value: `${modal.user.createdAt}`,
        inline: true,
      });

    const options: BaseMessageOptions = {
      content: `TODO`,
      embeds: [responseEmbed],
    };

    const payload = MessagePayload.create(modal, options);

    return modal.reply(payload);
  }
}
