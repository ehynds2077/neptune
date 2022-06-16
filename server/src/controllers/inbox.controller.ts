import { NextFunction, Request, Response } from "express";

import { createInboxItem } from "../models/Inbox";

export const addItem = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, is_done, notes } = req.body;
  try {
    if (!title) {
      throw new Error("Must include title");
    }

    const id = (req as any).user.id;

    const result = await createInboxItem(id, title, is_done, notes);
    if (!(result as any).rowCount) {
      throw new Error("Encountered a problem adding inbox item");
    }

    const item = { title, is_done, notes };

    res.json(item);
  } catch (e) {
    res.status(400);
    next(e);
  }
};
