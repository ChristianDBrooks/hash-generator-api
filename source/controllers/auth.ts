/** source/controllers/auth.ts */
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

interface Credential {
  username: String;
  salt: String;
  hash: String;
}

// adding a post
const addCredential = (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  const username: string = req.body.username;
  const password: string = req.body.password;
  const salt: string = genRandomString(16);
  const hash: string = getHash(salt + password);

  // save credential
  const credential: Credential = {
    username,
    salt,
    hash,
  };

  // return response
  return res.status(200).json({
    message: `User ${username} successfully created!`,
  });
};

// adding a post
const checkCredential = (req: Request, res: Response, next: NextFunction) => {
  // return response
  // get data from body
  // find record by username
  // hash provided password with retrieved salt
  // compare generated has with retrieved hash

  return res.status(200).json({
    message: "checkCredential",
  });
};

const genRandomString = (length: number) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

const getHash = (text: string) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

export default { addCredential, checkCredential };
