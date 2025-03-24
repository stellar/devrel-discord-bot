import { Field, Param } from '@discord-nestjs/core';
import { IsAlphanumeric } from 'class-validator';
import { TextInputModalData } from 'discord.js';

export class RegisterDto {
  @IsAlphanumeric()
  @Param({
    description: 'Your first name',
    required: true,
    name: 'first-name-input',
  })
  @Field('first-name-input')
  firstName: TextInputModalData;

  @IsAlphanumeric()
  @Param({
    description: 'Your last name',
    required: true,
    name: 'last-name-input',
  })
  @Field('last-name-input')
  lastName: TextInputModalData;

  @IsAlphanumeric()
  @Param({
    description: 'Github username',
    required: true,
    name: 'github-input',
  })
  @Field('github-input')
  github: TextInputModalData;

  @IsAlphanumeric()
  @Param({
    description: 'Email',
    required: true,
    name: 'email-input',
  })
  @Field('email-input')
  email: TextInputModalData;

  @IsAlphanumeric()
  @Param({
    description: 'Telegram',
    required: false,
    name: 'telegram-input',
  })
  @Field('telegram-input')
  telegram: TextInputModalData;
}
