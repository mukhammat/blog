import { Router } from "express";
const router = Router();

import {signIn, signUp} from "../controllers/auth";

router.route("/sign-in").post(signIn);
router.route("/sign-up").post(signUp);

export default router;