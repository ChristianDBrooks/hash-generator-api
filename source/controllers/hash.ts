/** source/controllers/auth.ts */
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// adding a post
const generateHash = (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  const randomSalt: string = req.body.randomSalt;
  const algorithm: string = req.body.algorithm;
  const secret: string = req.body.secret;
  let salt: string = req.body.salt || "";

  if (randomSalt == "on") {
    salt = genRandomString(16);
  }

  const hash: string = getHash(salt + secret, algorithm);

  let responseBody = {
    hash: hash,
    salt: salt
  }

  // return response
  return res.status(200).json(responseBody);
};

const genRandomString = (length: number) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

const getHash = (text: string, algorithm: string) => {
  return crypto.createHash(algorithm).update(text).digest("hex");
};

export default { generateHash };
