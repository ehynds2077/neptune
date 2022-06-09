import express from "express";
import { addItem, getItems } from "../controllers/inbox.controller";
import {
  addListItem,
  deleteItem,
  updateItem,
} from "../controllers/item.controller";
import { addList, getList, getLists } from "../controllers/list.controller";

export const apiRouter = express.Router();

// Inbox routes
apiRouter.post("/inbox", addItem);
apiRouter.get("/inbox", getItems);

// List routes
apiRouter.get("/lists", getLists);
apiRouter.post("/list", addList);
apiRouter.get("/list/:listId", getList);

// List item routes
apiRouter.put("/item/:id", updateItem);
apiRouter.delete("/item/:id", deleteItem);
apiRouter.post("/list/:listId", addListItem);
