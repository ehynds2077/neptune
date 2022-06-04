import knex, { Knex } from "knex";
import db from "../services/db";

export interface InboxItem {
  title: string;
  is_done: boolean;
  notes?: string;
  created_at: Date;

  id: string;
  user_id: string;
}

export const createInboxItemSchema = async function (
  schema: Knex.SchemaBuilder
) {
  await schema.createTable("inbox_item", (table) => {
    table.string("title").notNullable();
    table.boolean("is_done").notNullable().defaultTo(false);
    table.text("notes");
    table.datetime("created_at").notNullable().defaultTo(db.fn.now());

    table.uuid("user_id").notNullable().references("id").inTable("user");
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(db.raw("(gen_random_uuid())"));
  });
};

export const createInboxItem = async function (
  uid: string,
  title = "",
  isDone = false,
  notes: string | undefined
) {
  return await db.table("inbox_item").insert({
    title,
    is_done: isDone,
    notes,
    user_id: uid,
  });
};

export const getUserInbox = async function (uid: string) {
  return await db
    .select("title", "is_done", "notes", "id")
    .table("inbox_item")
    .where("user_id", uid)
    .orderBy("created_at");
};

export const updateInboxItem = async function (
  id: string,
  uid: string,
  title: string | undefined,
  isDone: boolean | undefined,
  notes: string | undefined
) {
  const updateObj: any = {};
  if (title !== undefined) {
    updateObj.title = title;
  }
  if (isDone !== undefined) {
    updateObj.is_done = isDone;
  }
  if (notes !== undefined) {
    updateObj.notes = notes;
  }
  console.log(id);
  console.log(uid);
  console.log(title);
  console.log(isDone);
  console.log(notes);

  return await db("inbox_item")
    .where("inbox_item.user_id", uid)
    .andWhere("id", id)
    .update(updateObj);
};
