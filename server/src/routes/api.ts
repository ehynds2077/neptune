import express from "express";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/inbox.controller";

export const apiRouter = express.Router();

// Inbox routes
apiRouter.post("/inbox", addItem);
apiRouter.get("/inbox", getItems);
apiRouter.put("/inbox/:id", updateItem);
apiRouter.delete("/inbox/:id", deleteItem);
