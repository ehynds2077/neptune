import { NextFunction, Request, Response } from "express";
import {
  createProject,
  deleteUserProject,
  getUserProject,
  getUserProjects,
} from "../models/Project";

export const getProjects = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = (req as any).user.id;

  const projects = await getUserProjects(id);
  res.json(projects);
};

export const getProject = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = (req as any).user.id;
  const { projectId } = req.params;
  try {
    if (!projectId) {
      throw new Error("Must include project id to get");
    }

    const project = await getUserProject(id, projectId);
    res.json(project);
  } catch (err) {
    res.status(400);
    next(err);
  }
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
    if (!result.length) {
      throw new Error("Encountered a problem adding project");
    }

    const project = { title };
    res.json(project);
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const deleteProject = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { projectId } = req.params;
  console.log(projectId);

  try {
    const uid = (req as any).user.id;
    if (!projectId) {
      throw new Error("Must provide project id to delete");
    }

    const result = await deleteUserProject(uid, projectId);
    console.log(result);

    res.send();
  } catch (err) {
    res.status(400);
    next(err);
  }
};
