import { Router } from "express";
const router = Router();

import authRouter from "./auth.router";
import postRouter from "./post.router";
import errorHanler from "../middleware/error-handler";

router.use("/auth", authRouter);
router.use("/post", postRouter);

router.use(errorHanler);
router.use((req, res)=> {
    res.status(404).json({message: "Not Found"});
});

export default router;