import { generateSessionToken } from "../services/token.service.js";
import { sessionServiceFactory } from "../services/session.service.js";
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../handlers/logger.js';
import { eventServiceFactory } from "../services/event.service.js";
import { mapServiceFactory } from "../services/map.service.js";
import { MapSquares } from "../constants/map-squares.constants.js";

const sessionService = sessionServiceFactory();
const eventService = eventServiceFactory();
const mapService = mapServiceFactory();

export class SessionController {
    constructor() {
        this.createSession = logger(this.createSession.bind(this));
        this.addUserOnSession = logger(this.addUserOnSession.bind(this));
    }

    async createSession(req, res) {
        try {
            const token = generateSessionToken(req.user.id);
            const { mapId } = req.body;
            
            const map = await mapService.getMapById(mapId);
            if (!map) {
                return sendResponse(res, StatusCodes.BAD_REQUEST, "This map does not valid");
            }

            const session = await sessionService.createSession(token, mapId);
            await sessionService.createUserSession(req.user.id, session.id, true);
            await eventService.initializeSessionEvents(map.source, session.id);
            return sendResponse(res, StatusCodes.OK, "Session created", token);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async addUserOnSession(req, res) {
        try {
            const { token } = req.body;
            const session = await sessionService.checkSession(token, true, true);
            if (!session) {
                return sendResponse(res, StatusCodes.NOT_FOUND, "Session not found");
            }
            const userSession = await sessionService.checkUserSession(req.user.id, session.id);
            if (userSession) {
                return sendResponse(res, StatusCodes.OK, "User already on session", session);
            }
            await sessionService.createUserSession(req.user.id, session.id, false);
            return sendResponse(res, StatusCodes.OK, "User added on session", session);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};