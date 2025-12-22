import jwt from "jsonwebtoken";

import { AppError } from "../utils/error.js";

/**
 * Middleware to protect routes and ensure the user is authenticated
 */

export const requireAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            throw new AppError("Not authenticated", 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user info
        next();
    } catch (error) {
        // Handle JWT errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, error: { message: "Token expired. Please login again." } });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, error: { message: "Invalid token. Please login again." } });
        }
        next(error);
    }
};
