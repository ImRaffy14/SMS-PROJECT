import prisma from "../config/prisma";
import { AppError } from "../utils/appError";

export const getAnnouncementService = async () => {
    const announcements = await prisma.announcement.findMany({
        orderBy: {
        createdAt: 'desc',
        },
    });
    
    return announcements;
}

export const createAnnouncementService = async (data: any) => {
    const announcement = await prisma.announcement.create({
        data: {
            title: data.title,
            message: data.message,
            audience: data.audience,
            status: data.status,
        },
    });

    return announcement;
}

export const editAnnouncementService = async (data: any, id: string) => {
    const announcement = await prisma.announcement.findUnique({
        where: { id },
    });

    if (!announcement) {
        throw new AppError('Announcement not found', 404);
    }
    

    const updatedAnnouncement = await prisma.announcement.update({
        where: { id },
        data: {
            title: data.title || announcement.title,
            message: data.message || announcement.message,
            audience: data.audience || announcement.audience,
            status: data.status || announcement.status,
        },
    });

    return updatedAnnouncement;
}

export const deleteAnnouncementService = async (id: string) => {
    const announcement = await prisma.announcement.delete({
        where: { id },
    });
    if (!announcement) {
        throw new AppError('Announcement not found', 404);
    }
    return announcement;
}