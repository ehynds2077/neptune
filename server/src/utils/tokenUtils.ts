import jwt from "jsonwebtoken";
import { configuration } from "../config";
import { addToken, checkValidToken } from "../models/RefreshToken";

export const checkAccessToken = function (token: string): string | undefined {
  const decoded = jwt.verify(token, configuration.ACCESS_SECRET) as any;
  return decoded.id;
};

export const checkRefreshToken = async function (
  token: string
): Promise<string | undefined> {
  const decoded = jwt.verify(token, configuration.REFRESH_SECRET) as any;
  const id = decoded.id;
  const result = await checkValidToken(token, id);
  return id;
};

export const createAccessToken = (id: string): string => {
  const expires = "15m";

  const token = jwt.sign({ id }, configuration.ACCESS_SECRET, {
    expiresIn: expires,
  });

  return token;
};

export const createRefreshToken = async (id: string) => {
  const expireDays = 30;

  const expires = `${expireDays}d`;
  const token = jwt.sign({ id }, configuration.REFRESH_SECRET, {
    expiresIn: expires,
  });

  await addToken(token, id, expireDays);

  return token;
};
