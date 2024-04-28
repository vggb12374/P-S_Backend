import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import { authRouter } from './routes/auth.routes.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import { userRouter } from './routes/user.routes.js';
import { mapRouter } from './routes/map.routes.js';
import { resourceRouter } from './routes/resource.routes.js';
import { sessionRouter } from './routes/session.routes.js';
import { sessionMiddleware } from './middleware/session.middleware.js';
import { inventoryRouter } from './routes/inventory.routes.js';
import { squareRouter } from './routes/square.routes.js';
// import socketIo from 'socket.io';
// import http from 'http';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

// const server = http.createServer(app);
// const io = socketIo(server);
const http = new Server(app);
const io = new SocketServer(http);

io.on('connection', (socket) => {
    console.log('a user connected');
});

export { io };

const api = "/api";
const sessions = "/sessions";

app.use(cors());
app.use(express.static('src/static'));
app.use(express.json());

app.use(api + '/auth', authRouter);
app.use(api, authMiddleware);
app.use(api, userRouter);
app.use(api, mapRouter);
app.use(api, resourceRouter);
app.use(api + sessions, sessionRouter);
app.use(api + sessions, sessionMiddleware);
app.use(api + sessions, inventoryRouter);
app.use(api + sessions, squareRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));