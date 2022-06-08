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

  // Might be able to remove this
  acquireConnectionTimeout: 400000,
  migrations: {
    directory: path.join(BASE_PATH, "migrations")
  },
};

module.exports = {
  development,
};
