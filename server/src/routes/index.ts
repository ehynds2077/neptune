import express from "express";
import { login, register } from "../controllers/auth.controller";
import { protectRoute } from "../middleware/protectRoute";
import { checkToken, createToken } from "../utils/tokenUtils";

export const router = express.Router();

router.get("", (req, res) => {
  res.send("test working");
});

router.post("/register", register);
router.post("/login", login);

router.get("/auth", (req: any, res) => {
  const { token } = req;
  const result = checkToken(token);
});

router.get("/getToken", (req: any, res) => {
  const token = createToken("9f749ff5-7ebe-4de3-87fc-367be1466c97");
  res.send(token);
});

router.get("/protected", protectRoute, (req: any, res) => {
  res.send("this is private!");
});
