import { Router } from "express";
const router = Router();

import authRouter from "./auth.router";
import postRouter from "./post.router";

router.use("/auth", authRouter);
router.use("/post", postRouter)

export default router;