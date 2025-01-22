import { Router } from "express";
const router = Router();

import { create, destroy, upload, getAll } from "../controllers/post";
import { uploadMedia } from "../utils/upload";
import { authorize } from "../middleware/authorize";
import { validateRequest } from '../middleware/validate-request';
import { CreateDto } from '../dtos/post.dto';

router.post("/create", authorize, validateRequest(CreateDto), create);
router.delete("/delete/:id", authorize, destroy);
router.get("/get-all", getAll);
router.post(
  "/upload",
  authorize,
  uploadMedia.single("media"),
  upload
);

export default router;
