import { Knex } from "knex";
import db from "../services/db";

export interface User {
  name: string;
  email: string;
  password_hash: string;
  id: string;
}

export const USER_TABLE = "user";

export const createUserSchema = async function (schema: Knex.SchemaBuilder) {
  await schema.createTable(USER_TABLE, (table) => {
    table.string("name").notNullable();
    table.string("password_hash").notNullable();
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
    password_hash: "alskdjfklsdj",
    id: "2d5fba14-a850-45d4-a3ba-700b9363f6f9",
  });
  await db.table(USER_TABLE).insert({
    name: "a",
    email: "yoasdf@yo.com",
    password_hash: "alssdfasdfkdjfklsdj",
    id: "7e39c4ff-95ce-4e1a-99a8-3a27f83aa0b7",
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
  passwordHash: string
) {
  const result = await db.table("user").insert({
    name,
    email,
    password_hash: passwordHash,
  });

  return result;
};
