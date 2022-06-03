import knex, { Knex } from "knex";
import db from "../services/db";

export interface InboxItem {
  title: string;
  is_done: boolean;
  notes?: string;

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

    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(db.raw("(gen_random_uuid())"));
    table.uuid("user_id").notNullable().references("id").inTable("user");
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
    .where("user_id", uid);
};
