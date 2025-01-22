import { Router } from "express";
const router = Router();

import {signIn, signUp} from "../controllers/auth";
import { validateRequest } from '../middleware/validate-request';
import { SignInDto, SignUpDto } from '../dtos/auth.dto';

router.post("/sign-in", validateRequest(SignInDto), signIn);
router.post("/sign-up", validateRequest(SignUpDto) ,signUp);

export default router;