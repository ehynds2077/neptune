import { NextFunction, Request, Response } from "express";
import {
  createList,
  deleteUserList,
  getUserList,
  getUserLists,
  updateUserList,
} from "../models/List";

export const getLists = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = (req as any).user.id;

  const lists = await getUserLists(id);
  res.json(lists);
};

export const getList = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let { listId } = req.params;

  try {
    const uid = (req as any).user.id;
    let result;
    if (listId === "") {
      const result = await getUserList(uid, null);
    } else {
      result = await getUserList(uid, listId);
    }

    res.json(result);
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export const updateList = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { listId } = req.params;
  const { title, list_parent_id } = req.body;

  try {
    const uid = (req as any).user.id;
    if (!listId) {
      throw new Error("Must provide list id to update");
    }

    if (!title && !list_parent_id) {
      throw new Error("Must provide parameter to update");
    }

    const result = await updateUserList(uid, listId, title, list_parent_id);

    res.send();
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const deleteList = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { listId } = req.params;

  try {
    const uid = (req as any).user.id;
    if (!listId) {
      throw new Error("Must provice list id to delete");
    }

    const result = await deleteUserList(uid, listId);

    res.send();
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const addList = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, list_type, parent_id } = req.body;

  try {
    if (!title || !list_type) {
      throw new Error("Must include title and list type");
    }

    const id = (req as any).user.id;

    const result = await createList(id, title, list_type, parent_id);
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
