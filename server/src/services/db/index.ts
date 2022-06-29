import knex from "knex";

import { development, production } from "../../../knexfile";
import { configuration } from "../../config";
import { getAllUsers } from "../../models/User";

const schemaName = "public";

const db = knex(
  configuration.NODE_ENV === "production" ? production : development
);

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

// export const testDb = async function () {};
