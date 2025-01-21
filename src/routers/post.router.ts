import { Router } from "express";
const router = Router();

import {create, destroy, upload} from "../controllers/post";
import {uploadMedia} from "../utils/upload";
import { authorize } from "../middleware/authorize"

router.post("/create", authorize, create);
router.delete("/delete/:id", authorize, destroy);
router.post(
    "/upload",
    authorize,
    uploadMedia.single("media"),
    upload
);

export default router;