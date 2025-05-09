import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
    getAnnouncementService,
    createAnnouncementService,
    editAnnouncementService,
    deleteAnnouncementService,
} from "../services/annnouncementService";

export const getAnnouncement = asyncHandler(async (req: Request, res: Response) => {
    const announcements = await getAnnouncementService();
    res.status(200).json({
        status: "success",
        announcements: announcements,
    });
})

export const createAnnouncement = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body

    console.log(data)
    const announcement = await createAnnouncementService(data)

    res.status(201).json({
        status: "success",
        message: "Announcement created successfully",
        announcement: announcement,
    })
})

export const editAnnouncement = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body
    const id = req.params.id

    const updatedAnnouncement = await editAnnouncementService(data, id)

    res.status(200).json({
        status: "success",
        message: "Announcement updated successfully",
        announcement: updatedAnnouncement,
    })
})

export const deleteAnnouncement = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id

    const deletedAnnouncement = await deleteAnnouncementService(id)

    res.status(200).json({
        status: "success",
        message: "Announcement deleted successfully",
        announcement: deletedAnnouncement,
    })
})



