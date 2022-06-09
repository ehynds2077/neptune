import db from "../services/db";

export interface ListItem {
  title: string;
  is_done: boolean;
  notes?: string;
  created_at: Date;

  id: string;
  user_id: string;
}

export const createListItem = async function (
  uid: string,
  listId: string,
  title = "",
  isDone = false,
  notes: string | undefined
) {
  return await db("list_item").insert({
    title,
    is_done: isDone,
    notes,
    user_id: uid,
    list_id: listId,
  });
};

export const updateListItem = async function (
  id: string,
  uid: string,
  title: string | undefined,
  isDone: boolean | undefined,
  notes: string | undefined
) {
  return await db("list_item")
    .where("user_id", uid)
    .andWhere("id", id)
    .update({ title, is_done: isDone, notes });
};

export const deleteListItem = async function (id: string, uid: string) {
  return await db("list_item").where("user_id", uid).andWhere("id", id).del();
};
