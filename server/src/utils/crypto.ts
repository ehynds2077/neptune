import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPass = async function (password: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};
