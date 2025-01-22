import { Request,Response } from "express";
import asyncWrapper from "../../middleware/async";

export const upload = asyncWrapper((req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send("Media upload error");
    }
    res.send(`Media uploaded successfully: ${req.file.filename}`);
});
