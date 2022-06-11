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

export const createProject = async function (uid: string, title: string) {
  return await db.table("project").insert({
    title,
    user_id: uid,
  });
};
