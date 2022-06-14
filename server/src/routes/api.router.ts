import express from "express";
import { addItem, getItems } from "../controllers/inbox.controller";
import {
  addListItem,
  deleteItem,
  updateItem,
} from "../controllers/item.controller";
import {
  addList,
  deleteList,
  getList,
  getLists,
} from "../controllers/list.controller";
import {
  addProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller";

export const apiRouter = express.Router();

// Inbox routes
apiRouter.post("/inbox", addItem);

// List routes
apiRouter.get("/lists", getLists);
apiRouter.post("/list", addList);
apiRouter.get("/list/:listId?", getList);
apiRouter.delete("/list/:listId", deleteList);

// List item routes
apiRouter.put("/item/:id", updateItem);
apiRouter.delete("/item/:id", deleteItem);
apiRouter.post("/list/:listId", addListItem);

// Project routes
apiRouter.get("/projects", getProjects);
apiRouter.post("/projects", addProject);

apiRouter.get("/project/:projectId", getProject);
apiRouter.delete("/project/:projectId", deleteProject);
apiRouter.put("/project/:projectId", updateProject);
