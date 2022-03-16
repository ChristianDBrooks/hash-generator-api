"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
// adding a post
const generateHash = (req, res, next) => {
    // get the data from req.body
    const randomSalt = req.body.randomSalt;
    const algorithm = req.body.algorithm;
    const secret = req.body.secret;
    let salt = req.body.salt || "";
    if (randomSalt == "on") {
        salt = genRandomString(16);
    }
    const hash = getHash(salt + secret, algorithm);
    let responseBody = {
        hash: hash,
        salt: salt
    };
    // return response
    return res.status(200).json(responseBody);
};
const genRandomString = (length) => {
    return crypto_1.default
        .randomBytes(Math.ceil(length / 2))
        .toString("hex") /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
};
const getHash = (text, algorithm) => {
    return crypto_1.default.createHash(algorithm).update(text).digest("hex");
};
exports.default = { generateHash };
