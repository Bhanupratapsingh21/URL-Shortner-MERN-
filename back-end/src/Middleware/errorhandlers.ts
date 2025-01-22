import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/Responses';

export const errorHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({
        status : err.status,
        message: err.message || 'An unexpected error occurred',
        error: err.error || null,
    });
};
