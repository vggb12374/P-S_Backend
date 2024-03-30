import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { router } from './routes/user.routes.js';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));