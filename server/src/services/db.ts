import knex from "knex";

import { configuration } from "../config";
import { createInboxItemSchema } from "../models/InboxItem";
import { createTokenSchema, testToken } from "../models/RefreshToken";
import {
  createUserSchema,
  getAllUsers,
  testInsertUser,
  USER_TABLE,
} from "../models/User";

const schemaName = "public";

const db = knex({
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
});

const testConn = async function () {
  try {
    await db.raw("SELECT 1");
    console.log("Database successfully connected");
  } catch (e) {
    console.log("Database unable to connect");
    console.log(e);
  }
};

testConn();

export default db;

const initSchema = async function () {
  // const schema = db.schema.withSchema(schemaName);
  await createUserSchema(db.schema);
  await createTokenSchema(db.schema);
  await createInboxItemSchema(db.schema);
};

const initDb = async function () {
  await initSchema();
  await testInsertUser();
  await testToken();
};

export const testDb = async function () {
  const token_exists = await db.schema.hasTable("refresh_token");
  const user_exists = await db.schema.hasTable("user");
  if (!token_exists && !user_exists) {
    await initDb();
  }

  const users = await getAllUsers();
  console.log(users);
};
