import { NextFunction, Request, Response } from "express";
import { addUser, getUserByEmail } from "../models/User";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/tokenUtils";
import { hashPass } from "../utils/crypto";
import db from "../services/db";

export const login = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Credentials not provided");
    }

    const errMsg = "Email or password is incorrect or user does not exist";
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error(errMsg);
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error(errMsg);
    }

    const accessToken = createAccessToken(user.id);
    res.status(200).json({ token: accessToken });
  } catch (e) {
    res.status(401);
    next(e);
  }
};

export const register = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, name } = req.body;

  try {
    if (!(name && email && password)) {
      throw new Error("Credentials not provided");
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      throw new Error("User with email already exists");
    }

    if ((password as string).length > 72) {
      throw new Error("Password must be at most 72 characters long");
    }

    const hashedPass = await hashPass(password);

    const result = await addUser(name, email, hashedPass);
    console.log(result);

    res.status(200).send();
  } catch (e) {
    res.status(400);
    next(e);
  }
};

// export const refresh = async function (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const { refreshToken } = req.body;

//   try {
//     if ()
//   }
// }
