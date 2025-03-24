<div style="text-align: center;" align="center">

<a href="https://stellar.org/" target="blank"><img src="https://cdn.discordapp.com/discovery-splashes/897514728459468821/392c5ba8562a90a76fd4a57f5e8058e6.jpg?size=2048" alt="Stellar Logo" title="Stellar Logo" width="100" /></a>
</div>

<div style="text-align: center;" align="center">
Stellar Discord Bot</div>

<div style="text-align: center;" align="center">

<a href="https://github.com/anataliocs/stellar-discord-bot/actions"><img alt="Build Status" src="https://github.com/anataliocs/stellar-discord-bot/workflows/CI/badge.svg"></a>
<a href="https://github.com/anataliocs/stellar-discord-bot/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
</div>

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/anataliocs/stellar-discord-bot)

## Table of Contents

- [Description](#description)
- [Project Setup](#project-setup)
- [Compile and Run](#compile-and-run)
- [Run Tests](#run-tests)
- [Run Locally with Discord](#run-locally-with-discord)
- [Docker](#docker)
- [License](#license)

## Description

[Nest](https://github.com/nestjs/nest) TypeScript Discord Bot for
the [Stellar Development Foundation](https://stellar.org/).

Check out the Discord here [Stellar Discord](https://discord.com/invite/zVYdY3ktTn).

## Project Setup

### Prerequisites

- Node.js >= 20.x
- pnpm
- Docker (optional, for containerized deployment)

### Installation

```bash
$ pnpm install
```

## Compile and run

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Run Locally with Discord

Using ngrok

```
ngrok http 3000
```

```
cloudflared tunnel --url http://localhost:3000
```

## Docker

Build image locally

```
docker build --platform linux/amd64 -t stellar-discord-bot .
```

Push to DockerHub

``` 
docker tag stellar-discord-bot:latest chrisstellar/stellar-discord-bot:latest
docker push chrisstellar/stellar-discord-bot:latest
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
