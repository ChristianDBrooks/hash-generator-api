/** source/routes/posts.ts */
import express from "express";
import controller from "../controllers/auth";
const router = express.Router();

router.post("/register", controller.addCredential);
router.post("/validate", controller.checkCredential);

export = router;
