import {Request, Response} from 'express';
import {
    createGradingSystemService,
    getGradingSystemService,
    deleteGradingSystemService,
} from '../services/gradingSystemService';
import {asyncHandler} from '../utils/asyncHandler';

export const getGradingSystem = asyncHandler(async (req: Request, res: Response) => {
    const gradingSystem = await getGradingSystemService();
    res.status(200).json({
        status: 'success',
        gradingSystem: gradingSystem,
    });
});

export const createGradingSystem = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    const gradingSystem = await createGradingSystemService(data);

    res.status(201).json({
        status: 'success',
        message: 'Grading system created successfully',
        gradingSystem: gradingSystem,
    });
});

export const deleteGradingSystem = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    const deletedGradingSystem = await deleteGradingSystemService(id);

    res.status(200).json({
        status: 'success',
        message: 'Grading system deleted successfully',
        gradingSystem: deletedGradingSystem,
    });
});