import jwt from "jsonwebtoken";
import { configuration } from "../config";

export const checkToken = (token: string): string | null => {
  const decoded = jwt.verify(token, configuration.JWT_SECRET) as any;
  if (decoded.id) {
    return decoded.id;
  } else {
    return null;
  }
};

export const createToken = (id: string): string => {
  const expires = "30d";

  const token = jwt.sign({ id }, configuration.JWT_SECRET, {
    expiresIn: expires,
  });

  return token;
};
