import { Request, Response, NextFunction } from "express";
import {
  createInboxItem,
  deleteInboxItem,
  getUserInbox,
  updateInboxItem,
} from "../models/InboxItem";

export const addItem = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, isDone, notes } = req.body;
  try {
    if (!title) {
      throw new Error("Must include title");
    }

    const id = (req as any).user.id;

    const result = await createInboxItem(id, title, isDone, notes);
    if (!(result as any).rowCount) {
      throw new Error("Encountered a problem adding inbox item");
    }

    const item = { title, isDone, notes };

    res.json(item);
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export const getItems = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = (req as any).user.id;

  const items = await getUserInbox(id);
  console.log(items);
  res.json({ inbox: items });
};

export const updateItem = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { title, isDone, notes } = req.body;
  try {
    if (!id) {
      throw new Error("Must provide id");
    }

    if (title === undefined && isDone === undefined && notes === undefined) {
      throw new Error("Must provide paramater to update");
    }

    const uid = (req as any).user.id;

    const result = await updateInboxItem(id, uid, title, isDone, notes);
    console.log(result);

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

    const result = await deleteInboxItem(id, uid);
    console.log(result);

    res.send();
  } catch (e) {
    res.status(400);
    next(e);
  }
};
