import { Request, Response } from "express";
import {
    getEmailService,
    createEmailService,
    editEmailService,
    deleteEmailService,
} from "../services/emailService";
import { asyncHandler } from "../utils/asyncHandler";

export const getEmailController = asyncHandler(
    async (req: Request, res: Response) => {
        const emails = await getEmailService();
        res.status(200).json({
            status: "success",
            data: emails,
        });
    }
);

export const createEmailController = asyncHandler(
    async (req: Request, res: Response) => {
        const email = await createEmailService(req.body);
        res.status(201).json({
            status: "success",
            message: "Email template created successfully",
            data: email
        });
    }
);

export const editEmailController = asyncHandler(
    async (req: Request, res: Response) => {
        const email = await editEmailService(req.params.id, req.body);
        res.status(200).json({
            status: "success",
            message: "Email template updated successfully",
            data: email,
        });
    }
);

export const deleteEmailController = asyncHandler(
    async (req: Request, res: Response) => {
        const email = await deleteEmailService(req.params.id);
        res.status(204).json({
            status: "success",
            data: email,
        });
    }
);