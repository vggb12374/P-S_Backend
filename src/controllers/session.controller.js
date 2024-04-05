import { generateSessionToken } from "../services/token.service.js";
import { sessionServiceFactory } from "../services/session.service.js";
const sessionService = sessionServiceFactory();
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';

export class SessionController {
    async createSession(req, res) {
        try {
            const token = generateSessionToken(req.user.id);
            const { mapId } = req.body;
            const session = await sessionService.createSession(token, mapId);
            await sessionService.createUserSession(req.user.id, session.id, true);
            //токен возвращать в параметре дата cледующей функции?
            return sendResponse(res, StatusCodes.OK, "Session created");
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async addUserOnSession(req, res) {
        try {
            const { token } = req.query;
            const session = await sessionService.checkSession(token);
            // if (!session) {
            //     return sendResponse(res, StatusCodes.BAD_REQUEST);
            // }
            await sessionService.createUserSession(req.user.id, session.id, false);
            return sendResponse(res, StatusCodes.OK, "User added on session");
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
};