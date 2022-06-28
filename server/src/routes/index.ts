import express from "express";

import {
  getUser,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/user.controller";
import { protectRoute } from "../middleware/protectRoute";
import { apiRouter } from "./api.router";

export const router = express.Router();

router.get("", (req, res) => {
  res.send("test working.  Nice!!");
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refreshToken", refreshToken);
router.get("/user", protectRoute, getUser);

router.use("/", protectRoute, apiRouter);
