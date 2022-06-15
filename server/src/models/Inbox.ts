import db from "../services/db";

export const createInboxItem = async function (
  uid: string,
  title = "",
  isDone = false,
  notes: string | undefined
) {
  return await db.table("list_item").insert({
    title,
    is_done: isDone,
    notes,
    user_id: uid,
  });
};

export const getUserInbox = async function (uid: string) {
  return await db
    .select("title", "is_done", "notes", "id", "list_id")
    .table("list_item")
    .where("user_id", uid)
    .where("list_id", null)
    .orderBy("created_at");
};
