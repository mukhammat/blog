import { Router } from "express";
const router = Router();

import { create, destroy, upload, getAll } from "../controllers/post";
import { uploadMedia } from "../utils/upload";
import { authorize } from "../middlewares/authorize.middleware";
import { validateRequest } from '../middlewares/validate-request.middleware';
import { CreateDto } from '../dtos/post.dto';

router.post("/create", authorize, validateRequest(CreateDto), create);
router.delete("/delete/:id", authorize, destroy);
router.get("/get-all", getAll);
router.post(
  "/upload",
  //authorize,
  uploadMedia.single("media"),
  upload
);

export default router;
