import { NextFunction, Request, Response } from "express";
import { createList, getUserLists } from "../models/List";

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

export const addList = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title } = req.body;
  console.log(title);

  try {
    if (!title) {
      throw new Error("Must include title");
    }

    const id = (req as any).user.id;

    const result = await createList(id, title);
    if ((!result as any).rowCount) {
      throw new Error("Encountered a problem adding list");
    }

    const list = { title };
    res.json(list);
  } catch (e) {
    res.status(400);
    next(e);
  }
};
