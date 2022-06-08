import knex, { Knex } from "knex";
import db from "../services/db";
import crypto from "crypto";

export interface RefreshToken {
  token_hash: string;
  expires: Date;
  user_id: string;
}

const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("base64");
};

export const getUserTokens = async function (uid: string) {
  deleteExpiredTokens();
  return await db
    .select("token_hash", "expires", "user_id")
    .table("refresh_token")
    .where("expires", ">", db.fn.now())
    .join("user", "refresh_token.user_id", "=", "user.id")
    .where("user_id", uid);
};

export const checkValidToken = async function (token: string, uid: string) {
  if (!token || !uid) {
    return false;
  }

  const tokenHash = hashToken(token);
  const tokens = await db
    .select("token_hash")
    .table("refresh_token")
    .where("expires", ">", db.fn.now())
    .andWhere("token_hash", tokenHash)
    .join("user", "refresh_token.user_id", "=", "user.id");
  const found = tokens[0];

  if (found) {
    return true;
  }
  return false;
};

export const deleteToken = async function (token: string) {
  const tokenHash = hashToken(token);
  return await db("refresh_token").where("token_hash", tokenHash).del();
};

export const deleteExpiredTokens = async function () {
  return await db("refresh_token").where("expires", "<", db.fn.now()).del();
};

export const getAllTokens = async function () {
  return await db.select().from("refresh_token");
};

export const addToken = async function (
  token: string,
  userId: string,
  expireDays: number = 30
) {
  const expiryDate = new Date(new Date().toUTCString());
  expiryDate.setDate(expiryDate.getDate() + expireDays);
  const tokenHash = crypto.createHash("sha256").update(token).digest("base64");
  return await db("refresh_token").insert({
    token_hash: tokenHash,
    user_id: userId,
    expires: expiryDate,
  });
};

const testAddGetToken = async function () {
  console.log("***Test add with good user id");
  await addToken("asdfkldsjakljsdf", "2d5fba14-a850-45d4-a3ba-700b9363f6f9");
  console.log("***Test add a few with other uid");
  await addToken("aksdjfkjsdkajsdkfj", "7e39c4ff-95ce-4e1a-99a8-3a27f83aa0b7");
  await addToken(
    "aksldjfksjajksddfkjaskdjf",
    "7e39c4ff-95ce-4e1a-99a8-3a27f83aa0b7"
  );
  await addToken(
    "alskdjfksdjkajsldkfjlkasjsldkfjlsdkj",
    "7e39c4ff-95ce-4e1a-99a8-3a27f83aa0b7"
  );
  console.log(await getAllTokens());
};

const testGetUserTokens = async function () {
  console.log("***Testing Get expired user tokens");
  console.log(await getUserTokens("2d5fba14-a850-45d4-a3ba-700b9363f6f9"));
};

const testDeleteExpiredTokens = async function () {
  console.log("***Testing delete expired tokens");
  console.log(await deleteExpiredTokens());
  console.log(await getAllTokens());
};

const testCheckValidToken = async function () {
  console.log("***Testing check valid token");
  console.log(
    await checkValidToken(
      "asdfkldsjakljsdf",
      "2d5fba14-a850-45d4-a3ba-700b9363f6f9"
    )
  );
  console.log("***Testing check invalid token");
  console.log(
    await checkValidToken("alksdjf", "2d5fba14-a850-45d4-a3ba-700b9363f6f9")
  );
};

export const testToken = async function () {
  console.log("***Testing token start");
  await testAddGetToken();
  await testGetUserTokens();
  await testDeleteExpiredTokens();
  await testCheckValidToken();
  console.log("***Testing token end");
};
