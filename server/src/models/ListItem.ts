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
  notes: string | undefined,
  newListId: string | undefined,
  projectId: string | undefined
) {
  if (newListId === "PROJECT_SUPPORT") {
    console.log("support");
    console.log(projectId);
    console.log("support");
    const lists = await db
      .select("id")
      .table("list")
      .where("user_id", uid)
      .andWhere("project_id", projectId);
    let supportList = lists[0];

    console.log(supportList);
    return await db("list_item")
      .where("user_id", uid)
      .andWhere("id", id)
      .update({
        title,
        is_done: isDone,
        notes,
        list_id: supportList.id,
        project_id: projectId,
      });
  } else {
    return await db("list_item")
      .where("user_id", uid)
      .andWhere("id", id)
      .update({
        title,
        is_done: isDone,
        notes,
        project_id: projectId === "" ? null : projectId,
        list_id: newListId === "" ? null : newListId,
      });
  }
};

export const deleteListItem = async function (id: string, uid: string) {
  return await db("list_item").where("user_id", uid).andWhere("id", id).del();
};
