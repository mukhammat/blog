import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import { Prisma } from "@prisma/client";

const errorHanler: ErrorRequestHandler = (error, req, res, next) => {
    
    let status = 500;
    let errorMessage = "Internal server error";

    if (isHttpError(error)) {
        status = error.status;
        errorMessage = error.message;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                status = 400;
                errorMessage = "It's already exists";
                break;
            case "P2025":
                status = 404;
                errorMessage = "Resource not found";
                break;
            default:
                status = 500;
                errorMessage = "Internal server error";
                break;
        }
    }

    res.status(status).json({ message: errorMessage });
};

export default errorHanler;
