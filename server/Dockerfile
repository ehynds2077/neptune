FROM node:lts-alpine

WORKDIR /usr/src/app


COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./tsconfig.json ./
RUN yarn install

COPY ./wait-for.sh ./
COPY ./docker-entry.sh ./
COPY ./knexfile.ts ./
RUN chmod +x ./wait-for.sh ./docker-entry.sh

# Run entry script.  Waits for database startup before starting api server
ENTRYPOINT [ "./docker-entry.sh" ] 

