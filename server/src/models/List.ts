import db from "../services/db";

export interface List {
  id: string;
  created_at: Date;

  user_id: string;

  title: string;
}

export const getUserLists = async function (uid: string) {
  return await db
    .select("title", "id")
    .table("list")
    .where("user_id", uid)
    .orderBy("created_at");
};

export const createList = async function (uid: string, title: string) {
  return await db.table("list").insert({
    title,
    user_id: uid,
  });
};
