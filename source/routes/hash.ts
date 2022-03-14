/** source/routes/posts.ts */
import express from "express";
import HashController from "../controllers/hash";
const router = express.Router();

router.post("/create", HashController.generateHash);

export = router;
