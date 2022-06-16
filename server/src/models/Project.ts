import db from "../services/db";

export interface Project {
  id: string;
  created_at: string;
  title: string;
  user_id: string;
}

export const getUserProjects = async function (uid: string) {
  return await db
    .select("id", "title")
    .table("project")
    .where("user_id", uid)
    .orderBy("created_at");
};

export const getUserProject = async function (uid: string, projectId: string) {
  const matches = await db
    .select("id", "title")
    .table("project")
    .where("user_id", uid)
    .andWhere("id", projectId);

  const project = matches[0];

  const items = await db
    .select(
      "list_item.id",
      "list_item.title",
      "list_item.is_done",
      "list_item.notes",
      "list.id as list_id",
      "list.title as list_title",
      "list.list_type as list_type",
      "list_item.project_id"
    )
    .table("list_item")
    .where("list_item.user_id", uid)
    .join("list", "list_item.list_id", "=", "list.id")
    .where("list_item.project_id", projectId)
    .orWhere("list.project_id", projectId)
    .orderBy("list_item.created_at");

  return { ...project, items };
};

export const deleteUserProject = async function (uid: string, id: string) {
  return await db("project").where("user_id", uid).andWhere("id", id).del();
};

export const createProject = async function (uid: string, title: string) {
  const projectInsert = await db.table("project").returning("id").insert({
    title,
    user_id: uid,
  });

  const projectId = (projectInsert[0] as any).id;

  const supportInsert = await db.table("list").insert({
    project_id: projectId,
    list_type: "PROJECT_SUPPORT",
    title: "",
    user_id: uid,
  });

  console.log(projectInsert);

  return projectInsert;
};

export const updateUserProject = async function (
  uid: string,
  id: string,
  title: string
) {
  return await db("project")
    .where("user_id", uid)
    .andWhere("id", id)
    .update({ title });
};
