import express from "express";
import { addItem, getItems } from "../controllers/inbox.controller";
import { deleteItem, updateItem } from "../controllers/item.controller";
import { addList, getLists } from "../controllers/list.controller";

export const apiRouter = express.Router();

// Inbox routes
apiRouter.post("/inbox", addItem);
apiRouter.get("/inbox", getItems);

// List item routes
apiRouter.put("/item/:id", updateItem);
apiRouter.delete("/item/:id", deleteItem);

apiRouter.get("/lists", getLists);
apiRouter.post("/list", addList);
