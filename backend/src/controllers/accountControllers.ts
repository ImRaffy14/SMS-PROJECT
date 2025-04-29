import { Request, Response } from "express";
import {
    getUserService 
} from "../services/accountService";
import { asyncHandler } from "../utils/asyncHandler";

export const getUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await getUserService();
    res.status(200).json({
        status: "success",
        data: user,
    });
})