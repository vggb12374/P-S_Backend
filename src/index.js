import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from "cors";
import { authRouter } from './routes/auth.routes.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import { userRouter } from './routes/user.routes.js';
import { mapRouter } from './routes/map.routes.js';
import { sessionRouter } from './routes/session.routes.js';

const PORT = process.env.PORT;
const app = express();
const api = "/api";

app.use(cors());
app.use(express.json());

app.use(api + '/auth', authRouter);
app.use(api, authMiddleware);
app.use(api, userRouter);
app.use(api, mapRouter);
app.use(api, sessionRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));