/** source/controllers/auth.ts */
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// adding a post
const generateHash = (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  const algorithm: string = req.body.algorithm;
  const secret: string = req.body.secret;
  const salt: string = req.body.salt || "";
  const hash: string = getHash(salt + secret, algorithm);

  // return response
  return res.status(200).json({
    hash: hash,
  });
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
