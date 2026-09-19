import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

type RegisterInput = {
    name: string;
    email: string;
    password: string;
};
type LoginInput = {
    email: string;
    password: string;
};

export async function registerUser(data: RegisterInput) {
    console.log("service reached", data);
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash,
        },
    });
    return user;
}

export async function loginUser(data: LoginInput) {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(
        data.password,
        user.passwordHash
    );
    if (!validPassword) {
        throw new Error("Invalid credentials")
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const payload = {
        id: user.id,
        email: user.email,
    };
    jwt.sign(payload, jwtSecret);
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: "7d",
    });
    return { user,token};
    /*
{
    user:{id, name, adbcd}, token}
     */
}
