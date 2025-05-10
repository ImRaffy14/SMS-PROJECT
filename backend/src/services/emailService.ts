import prisma from "../config/prisma";
import { AppError } from "../utils/appError";
import { Email } from "../types";

export const getEmailService = async () => {
    const emails = await prisma.emailTemplate.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return emails;
}

export const createEmailService = async (data: Email) => {
    const email = await prisma.emailTemplate.create({
        data: {
            name: data.name,
            type: data.type,
            message: data.message,
            status: data.status,
        },
    });

    return email;
}

export const editEmailService = async (id: string, data: Email) => {
    const email = await prisma.emailTemplate.findUnique({ where: { id } });

    if (!email) {
        throw new AppError('Email template not found', 404);
    }

    const updatedEmail = await prisma.emailTemplate.update({
        where: { id },
        data: {
            name: data.name,
            type: data.type,
            message: data.message,
            status: data.status,
        },
    });

    return updatedEmail;
}

export const deleteEmailService = async (id: string) => {
    const email = await prisma.emailTemplate.findUnique({ where: { id } });

    if (!email) {
        throw new AppError('Email template not found', 404);
    }

    await prisma.emailTemplate.delete({ where: { id } });

    return email;
}

