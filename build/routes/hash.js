"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/** source/routes/posts.ts */
const express_1 = __importDefault(require("express"));
const hash_1 = __importDefault(require("../controllers/hash"));
const router = express_1.default.Router();
router.post("/create", hash_1.default.generateHash);
module.exports = router;
