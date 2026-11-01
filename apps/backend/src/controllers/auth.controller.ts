import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { loginUser, registerUser } from "../services/auth.service.js";

export async function register(
    req: Request,
    res: Response
) {
    console.log(" BODY:", req.body);
    try {
        const user = await registerUser(req.body);
        const { passwordHash, ...safeUser } = user;

        res.status(201).json({
            message: "User created",
            user: safeUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:
                error instanceof Error ? error.message : "Something went wrong",
        });
    }

}

export async function login(
    req: Request,
    res: Response
) {
    try {
        const {user, token} = await loginUser(req.body);

        res.status(200).json({
            message: "User login successfully",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(401).json({
            message:
                error instanceof Error ? error.message : "Something went wrong",
        });
    }
}

export async function getMe(req:Request, res: Response) {
    try {
        const userId = req.user?.id;
        console.log("\n\n\nuser",req.user);


        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized, userId not found",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.status(200).json({
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
}
