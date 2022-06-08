import { NextFunction, Request, Response } from "express";

import { deleteListItem, updateListItem } from "../models/ListItem";

export const updateItem = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { title, is_done, notes } = req.body;
  try {
    if (!id) {
      throw new Error("Must provide id");
    }

    if (title === undefined && is_done === undefined && notes === undefined) {
      throw new Error("Must provide paramater to update");
    }

    const uid = (req as any).user.id;

    const result = await updateListItem(id, uid, title, is_done, notes);
    if (!result) {
      throw new Error("Could not update item");
    }

    res.send();
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export const deleteItem = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("Must provide id");
    }

    const uid = (req as any).user.id;

    const result = await deleteListItem(id, uid);
    console.log(result);

    res.send();
  } catch (e) {
    res.status(400);
    next(e);
  }
};
