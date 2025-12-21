export class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor); // for debugging purposes
    }
}

/**
 * Error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
    // Log error for debugging
    console.log('Error from error handler:', err);

    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal server error';

    if (err.cause?.code === '23505') {
        statusCode = 409;
        message = 'Email already registered';
    }

    // YOUR custom AppError
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // Handle known error types
    return res.status(statusCode).json({
        success: false,
        error: {
            message,
            code: statusCode,
        },
    });
};
