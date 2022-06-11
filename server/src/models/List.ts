import db from "../services/db";

export interface List {
  id: string;
  created_at: Date;

  user_id: string;

  project_id?: string;
  list_parent_id?: string;

  title?: string;
  list_type: string;
}

enum List_ListType {
  Next = "NEXT",
  Someday = "SOMEDAY",
  Waiting = "WAITING",
  Agenda = "AGENDA",
  ProjectSupport = "PROJECT_SUPPORT",
  Reference = "REFERENCE",
}

export const getUserListsOfType = async function (
  uid: string,
  type: List_ListType
) {
  return await db
    .select("title", "id")
    .table("list")
    .where("user_id", uid)
    .andWhere("list_type", type)
    .orderBy("created_at");
};

export const getUserLists = async function (uid: string) {
  return await db
    .select("title", "id", "list_type")
    .table("list")
    .where("user_id", uid)
    .orderBy("created_at");
};

export const getUserList = async function (uid: string, listId: string) {
  const lists = await db
    .select("title", "id", "list_type")
    .table("list")
    .where("user_id", uid)
    .andWhere("id", listId);
  const list = lists[0];

  const items = await db
    .select(
      "list_item.id",
      "list_item.title",
      "list_item.is_done",
      "list_item.notes",
      "list_item.list_id as listId"
    )
    .table("list")
    .where("list.user_id", uid)
    .join("list_item", "list_item.list_id", "=", "list.id")
    .where("list.id", listId)
    .orderBy("list_item.created_at");

  return { ...list, items };
};

export const createList = async function (
  uid: string,
  title: string,
  type: List_ListType
) {
  return await db.table("list").insert({
    title,
    user_id: uid,
    list_type: type,
  });
};
