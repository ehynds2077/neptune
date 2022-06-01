import { NextFunction, Response } from "express";
import { getUserByID } from "../models/User";
import { checkToken } from "../utils/tokenUtils";

export const protectRoute = (req: any, res: Response, next: NextFunction) => {
  let token;
  const authHeader = req.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];

      if (!token) {
        throw new Error("Not authorized, no token provided");
      }

      const id = checkToken(token);
      if (!id) {
        throw new Error("Unable to verify token");
      }

      const user = getUserByID(id);

      if (!user) {
        throw new Error("Unable to find user");
      }

      console.log(user);

      req.user = user;

      next();
    } catch (e) {
      res.status(401);
      next(e);
    }
  }

  res.status(401);
  const err = new Error("Not authorized, no token provided");
  next(err);
};
