import prisma from "../config/prisma";
import { AppError } from "../utils/appError";
import { GradingSystem } from "../types";


export const getGradingSystemService = async () => {
    const gradingSystems = await prisma.gradingSystem.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return gradingSystems;
}

export const createGradingSystemService = async (data: GradingSystem) => {
    const gradingSystem = await prisma.gradingSystem.create({
        data: {
            name: data.name,
            type: data.type,
            scale: data.scale,
            passingGrade: data.passingGrade,
            isDefault: data.isDefault,
            description: data.description,
        },
    });

    return gradingSystem;
}

export const deleteGradingSystemService = async (id: string) => {
    const gradingSystem = await prisma.gradingSystem.findUnique({ where: { id } });

    if (!gradingSystem) {
        throw new AppError('Grading system not found', 404);
    }

    await prisma.gradingSystem.delete({ where: { id } });

    return gradingSystem;
}