import express from "express";

import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/user.controller";
import { protectRoute } from "../middleware/protectRoute";
import { apiRouter } from "./api";

export const router = express.Router();

router.get("", (req, res) => {
  res.send("test working");
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", protectRoute, getUser);

router.use("/api", protectRoute, apiRouter);
