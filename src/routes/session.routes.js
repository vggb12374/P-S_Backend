import Router from 'express';
const sessionRouter = new Router();
import { SessionController } from '../controllers/session.controller.js';
const sessionController = new SessionController();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjYzc5ZWIxLWMyNTAtNDUwNC1iOTY1LTNiZjU5OTU2MWIxNiIsImlhdCI6MTcxMjMwNjg1MywiZXhwIjoxNzEyMzI0ODUzfQ.GX82h0bb94I3SUOGuNYtjjLGWwJUPHxxvr9sAqi2Zbc";

sessionRouter.post('/sessions', sessionController.createSession);
sessionRouter.get('/sessions', sessionController.addUserOnSession);

export { sessionRouter };