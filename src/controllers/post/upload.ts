import { Request,Response } from "express";
import asyncWrapper from "../../middleware/async";

export const upload = asyncWrapper((req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send("Медия успешно загружен:");
    }
    res.send(`Медия успешно загружен: ${req.file.filename}`);
});
