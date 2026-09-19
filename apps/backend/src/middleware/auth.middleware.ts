import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("HEADERS: ", req.headers);

    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER: ", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized authHeader",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, token not found",
        });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }

    try {
        const decoded = jwt.verify(
            token,
            jwtSecret,
        );
        console.log(decoded);
        req.user = decoded as {
            id: string;
            email: string;
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}
