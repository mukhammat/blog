import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import { Prisma } from "@prisma/client";

/**
 * Централизованный обработчик ошибок для приложения Express.
 */
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let status = 500;
    let errorMessage = "Internal server error";
    let errorCode: string | null = null;

    // Обработка HTTP ошибок
    if (isHttpError(error)) {
        status = error.status;
        errorMessage = error.message;
    }

    // Обработка ошибок Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        errorCode = error.code;
        switch (error.code) {
            case "P2002":
                status = 400;
                errorMessage = "Unique constraint failed: this resource already exists.";
                break;
            case "P2025":
                status = 404;
                errorMessage = "Resource not found.";
                break;
            default:
                errorMessage = "Database error occurred.";
                break;
        }
    }

    // Логирование ошибки в консоль (или в лог-файл)
    console.error("Error:", {
        message: error.message,
        stack: error.stack,
        code: errorCode,
    });

    // Формирование ответа
    res.status(status).json({
        message: errorMessage,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }), // Скрыть stack trace в продакшене
        ...(errorCode && { code: errorCode }), // Указать код ошибки, если доступно
    });
};

export default errorHandler;
