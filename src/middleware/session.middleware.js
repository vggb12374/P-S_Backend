import { sendResponse } from "../handlers/response.js";
import { StatusCodes } from "http-status-codes";
import { sessionServiceFactory } from "../services/session.service.js";
const sessionService = sessionServiceFactory();

export async function sessionMiddleware(req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[3];
        if (!token) {
            return sendResponse(res, StatusCodes.NOT_FOUND, "Session not found");
        }
        const session = await sessionService.checkSession(token, true, false);
        if (!session) {
            return sendResponse(res, StatusCodes.FORBIDDEN, "Session not found");
        }
        req.session = session;
        req.session.token = token;
        next();
    } catch (error) {
        console.log(error);
        return sendResponse(res, StatusCodes.NOT_FOUND, "Session not found");
    }
}