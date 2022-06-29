# Neptune

A free and open source task manager based on the GTD methodology

## Installation

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (Tested on Docker version 20.10.13, Docker-compose version 1.29.2)
- [Yarn](https://yarnpkg.com/getting-started/install) (Tested on version 1.22.18)

### Setup

1. Clone this repo and enter into directory

```sh
git clone https://github.com/ehynds2077/neptune.git
cd neptune
```

2. Copy and rename the .env example files

```sh
cp ./server/.server.env.example ./server/.server.env
cp ./server/.env.example ./server/.env
cp ./web/.env.example ./web/.env
```

---

### To run the server:

(Run from the root directory)

```sh
cd server
yarn docker-dev up
```

### To run the web client

(Run from the root directory)

```sh
cd web
yarn install
yarn start
```

### Generating secure JWT secrets

`node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`
