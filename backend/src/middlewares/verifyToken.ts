import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';
import { CipherToken } from '../utils/chyToken';

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.cookies.accessToken;


    if (!token) {
        res.status(401).json({ error: 'No token provided. Authorization denied.' });
        return;
    }

        const encKey = Buffer.from('a'.repeat(64), 'hex');
    
        const chyAuth = new CipherToken(encKey.toString('hex'));

    try {
        const decoded = chyAuth.decrypt(token);

        if (typeof decoded === 'string') {
        res.status(401).json({ error: 'Malformed token payload.' });
        return;
    }

    const payload = decoded as any;
    
    
    if (!payload.userId) {
        res.status(401).json({ error: 'Invalid token payload.' });
        return;
    }

    req.user = payload;

    if(req.user) {
         next();
    }
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token. Authorization denied.' });
    }
};