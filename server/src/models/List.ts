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

export const deleteUserList = async function (uid: string, id: string) {
  return await db("list").where("user_id", uid).andWhere("id", id).del();
};

export const getUserList = async function (uid: string, listId: string | null) {
  let list;
  let items;
  if (listId) {
    const lists = await db
      .select("title", "id", "list_type")
      .table("list")
      .where("user_id", uid)
      .andWhere("id", listId);
    list = lists[0];
    items = await db
      .table("list_item")
      .leftJoin("project", "list_item.project_id", "=", "project.id")
      .leftJoin("list", "list_item.list_id", "=", "list.id")
      .where("list_item.user_id", uid)
      .where("list_item.list_id", listId)
      .orderBy("list_item.created_at")
      .columns([
        "list_item.id",
        "list_item.title",
        "list_item.is_done",
        "list_item.notes",
        "list.list_type as list_type",
        "list_item.list_id as list_id",
        "list.title as list_title",
        "project.id as project_id",
        "project.title as project_title",
      ]);
  } else {
    list = { title: "Inbox", id: "" };
    items = await db
      .select("id", "title", "is_done", "notes", "list_id", "project_id")
      .table("list_item")
      .where("user_id", uid)
      .where("list_id", null)
      .orderBy("created_at");
  }

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

export const updateUserList = async function (
  uid: string,
  id: string,
  title: string
) {
  return await db("list")
    .where("user_id", uid)
    .andWhere("id", id)
    .update({ title });
};
