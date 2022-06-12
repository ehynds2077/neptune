import { NextFunction, Request, Response } from "express";
import { createList, getUserList, getUserLists } from "../models/List";

export const getLists = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = (req as any).user.id;

  const lists = await getUserLists(id);
  console.log(lists);
  res.json(lists);
};

export const getList = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let { listId } = req.params;
  console.log(listId);

  try {
    const uid = (req as any).user.id;
    let result;
    if (listId === "") {
      const result = await getUserList(uid, null);
    } else {
      result = await getUserList(uid, listId);
    }

    console.log(result);
    res.json(result);
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export const addList = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, list_type } = req.body;
  console.log(title);

  try {
    if (!title || !list_type) {
      throw new Error("Must include title and list type");
    }

    const id = (req as any).user.id;

    const result = await createList(id, title, list_type);
    if (!(result as any).rowCount) {
      throw new Error("Encountered a problem adding list");
    }

    const list = { title, list_type };
    res.json(list);
  } catch (e) {
    res.status(400);
    next(e);
  }
};
