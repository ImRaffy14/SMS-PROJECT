require('dotenv').config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import { errorHandler } from './utils/errorHandler';
import authRoutes from './routes/authRoutes';
import accountRoutes from './routes/accountRoutes';
import announcementRoutes from './routes/announcementRoutes';
import requestLogger from './middlewares/logger';
import gradingSystemRoutes from './routes/gradingSystemRoutes';
import emailRoutes from './routes/emailRoutes';

const app = express();

const allowedOrigins = ['http://localhost:3005', 'https://sms.imraffydev.com'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

app.use('/api/auth', authRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/announcement', announcementRoutes)
app.use('/api/gradingSystem', gradingSystemRoutes)
app.use('/api/email', emailRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use(errorHandler)


export default app;