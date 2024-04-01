import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import { router } from './routes/user.routes.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));