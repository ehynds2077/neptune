import { Knex } from "knex";
import db from "../services/db";

export interface User {
  name: string;
  email: string;
  password_hash: string;
  id: string;
}

export const testInsertUser = async function () {
  await db.table("user").insert({
    name: "a",
    email: "yo@yo.com",
    password_hash: "alskdjfklsdj",
    id: "2d5fba14-a850-45d4-a3ba-700b9363f6f9",
  });
  await db.table("user").insert({
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
  const users = await db
    .select("name", "email", "id")
    .table("user")
    .where("id", id);
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
  // TODO: convert this into unified transaction
  const insertedUsers = await db
    .table("user")
    .insert({
      name,
      email,
      password_hash: passwordHash,
    })
    .returning("id");
  const user = insertedUsers[0];

  if (!user) {
    return false;
  }

  const addRootLists = await db.table("list").insert([
    {
      title: "Next",
      user_id: user.id,
      list_type: "NEXT",
      order: 1,
    },
    {
      title: "Waiting",
      user_id: user.id,
      list_type: "WAITING",
      order: 1,
    },
    {
      title: "Someday/Maybe",
      user_id: user.id,
      list_type: "SOMEDAY",
      order: 1,
    },
    {
      title: "Agenda",
      user_id: user.id,
      list_type: "AGENDA",
      order: 1,
    },
    {
      title: "Reference",
      user_id: user.id,
      list_type: "REFERENCE",
      order: 1,
    },
  ]);

  if (!addRootLists) {
    return false;
  }

  return true;
};
