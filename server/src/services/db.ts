import knex from "knex";
import { configuration } from "../config";
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
  const schema = db.schema.withSchema(schemaName);
  await createUserSchema(schema);
};

const initDb = async function () {
  await initSchema();
  await testInsertUser();
};

export const testDb = async function () {
  const exists = await db.schema.hasTable(USER_TABLE);
  if (!exists) {
    await initDb();
  }

  const users = await getAllUsers();
  console.log(users);
};
