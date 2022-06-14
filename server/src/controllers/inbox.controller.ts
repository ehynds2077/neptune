import { Request, Response, NextFunction } from "express";
import { createInboxItem, getUserInbox } from "../models/Inbox";

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
  res.json({ title: "Inbox", id: "", items });
};
