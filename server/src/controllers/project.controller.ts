import { NextFunction, Request, Response } from "express";
import { createProject, getUserProjects } from "../models/Project";

export const getProjects = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = (req as any).user.id;

  const projects = await getUserProjects(id);
  res.json(projects);
};

export const addProject = async function (
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
    const uid = (req as any).user.id;

    const result = await createProject(uid, title);
    if (!(result as any).rowCount) {
      throw new Error("Encountered a problem adding project");
    }

    const project = { title };
    res.json(project);
  } catch (err) {
    res.status(400);
    next(err);
  }
};
