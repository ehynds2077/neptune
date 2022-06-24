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
  passwordHash: string,
  demo: boolean | undefined
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

  if (demo) {
    await addDemoData(user.id);
  }

  if (!addRootLists) {
    return false;
  }

  return true;
};

export const addDemoData = async function (uid: string) {
  await db.table("list_item").insert([
    {
      title: "Welcome to Neptune!",
      user_id: uid,
    },
    {
      title:
        "This is the Inbox, the place to capture everything.  New thoughts, actions, ideas, etc, all start here.",
      user_id: uid,
    },
    {
      title:
        "Try deleting this item.  Click on the trash bin icon on the right end of this row.",
      user_id: uid,
    },
    {
      title:
        "Try editing this item. Click on the middle of the row to bring up the edit form.",
      user_id: uid,
    },
    {
      title:
        "Try completing this item.  Click the checkbox on the left end of this row. Click again to revert. ",
      user_id: uid,
    },
    {
      title:
        "Try creating a new item. Click the add new item button below this row.",
      user_id: uid,
    },
  ]);
};
