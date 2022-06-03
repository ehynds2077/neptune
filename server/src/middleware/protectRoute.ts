import { NextFunction, Request, Response } from "express";
import { getUserByID } from "../models/User";
import { checkAccessToken } from "../utils/tokenUtils";

export const protectRoute = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;

  if (req.user) {
    next();
  }

  try {
    if (!accessToken) {
      throw new Error("Not Authorized, no token provided");
    }

    const id = checkAccessToken(accessToken);
    if (!id) {
      throw new Error("Not Authorized, unable to verify token");
    }

    const user = await getUserByID(id);
    if (!user) {
      throw new Error("Not Authorized, unable to find user");
    }

    req.user = user;

    next();
  } catch (e) {
    res.status(401);
    next(e);
  }
};
