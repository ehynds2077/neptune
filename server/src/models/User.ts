import { Knex } from "knex";
import db from "../services/db";

export interface User {
  name: string;
  email: string;
  hashedPass: string;
  id: string;
}

export const USER_TABLE = "user";

export const createUserSchema = async function (schema: Knex.SchemaBuilder) {
  await schema.createTable(USER_TABLE, (table) => {
    table.string("name").notNullable();
    table.string("hashedPass").notNullable();
    table.string("email").unique().notNullable();
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(db.raw("(gen_random_uuid())"));
  });
};

export const testInsertUser = async function () {
  await db.table(USER_TABLE).insert({
    name: "a",
    email: "yo@yo.com",
    hashedPass: "alskdjfklsdj",
  });
};

export const getAllUsers = async function () {
  return await db.select().table("user");
};

export const getUserByID = async function (id: string) {
  const users = await db.select().table("user").where("id", id);
  return users[0];
};

export const getUserByEmail = async function (email: string) {
  const users = await db.select().table("user").where("email", email);
  return users[0];
};

export const addUser = async function (
  name: string,
  email: string,
  hashedPass: string
) {
  const result = await db.table("user").insert({
    name,
    email,
    hashedPass,
  });

  return result;
};
