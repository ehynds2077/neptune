import { configuration } from "./src/config";
import * as path from "path";

const BASE_PATH = path.join(__dirname, "src", "services", "db");

export const development = {
  client: "pg",

  connection: {
    host: configuration.DB_HOST,
    port: configuration.DB_PORT,
    user: configuration.POSTGRES_USER,
    password: configuration.POSTGRES_PASSWORD,
    database: configuration.POSTGRES_DB,
  },

  migrations: {
    directory: path.join(BASE_PATH, "migrations"),
  },
};

export const production = {
  client: "pg",
  connection: configuration.DATABASE_URL,
  migrations: {
    directory: path.join(BASE_PATH, "migrations"),
  },
};

module.exports = {
  development,
  production,
};
