import { Router } from "express";
const router = Router();

import { signIn, signUp } from "../controllers/auth";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { SignInDto, SignUpDto } from "../dtos/auth.dto";


router.post("/signin", validateRequest(SignInDto), signIn);
router.post("/signup", validateRequest(SignUpDto), signUp);

export default router;
