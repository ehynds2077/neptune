import { NextFunction, Request, Response } from "express";

import {
  createListItem,
  deleteListItem,
  updateListItem,
} from "../models/ListItem";

export const addListItem = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { listId } = req.params;
  const { title } = req.body;

  try {
    if (!listId) {
      throw new Error("Must provide list id");
    }

    if (!title) {
      throw new Error("Must provide item title");
    }

    const uid = (req as any).user.id;

    const result = await createListItem(uid, listId, title, false, undefined);

    res.json(result);
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export const updateItem = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const {
    title,
    is_done,
    notes,
    new_list_id,
    project_id: newProjectId,
    project,
  } = req.body;

  let projectId = project ? project.id : newProjectId;
  try {
    if (!id) {
      throw new Error("Must provide id");
    }

    if (
      title === undefined &&
      is_done === undefined &&
      notes === undefined &&
      new_list_id === undefined &&
      projectId === undefined
    ) {
      throw new Error("Must provide paramater to update");
    }

    const uid = (req as any).user.id;

    const result = await updateListItem(
      id,
      uid,
      title,
      is_done,
      notes,
      new_list_id,
      projectId
    );
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

    res.send();
  } catch (e) {
    res.status(400);
    next(e);
  }
};
