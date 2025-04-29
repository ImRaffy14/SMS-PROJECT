import prisma from "../config/prisma";
import { AppError } from "../utils/appError";
import { User } from "../types";

export const getUserService = async () => {
    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return users;
}

export const editUserService = async () => {
    
}