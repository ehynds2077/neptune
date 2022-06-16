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
