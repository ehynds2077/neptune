import { NextFunction, Request, Response } from "express";
import { addUser, getUserByEmail } from "../models/User";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/tokenUtils";
import { hashPass } from "../utils/crypto";
import { configuration } from "../config";

export const login = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Check for credentials
    if (!email || !password) {
      throw new Error("Credentials not provided");
    }

    const errMsg = "Email or password is incorrect or user does not exist";

    // Check user exists
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error(errMsg);
    }

    // Check pass
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new Error(errMsg);
    }

    // Gen tokens
    const accessToken = createAccessToken(user.id);
    const refreshToken = await createRefreshToken(user.id);

    // Set cookie to secure for production
    const cookieOptions = {
      httpOnly: true,
      secure: configuration.PROD ? true : false,
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).send({ name: user.name, email: user.email, uid: user.id });
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
  console.log(email, password);

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
