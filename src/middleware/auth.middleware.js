import { decodeAccessToken } from '../services/token.service.js';
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';

export function authMiddleware (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return sendResponse(res, StatusCodes.UNAUTHORIZED, "User is not authorized");
        }
        const decodedData = decodeAccessToken(token);
        req.user = decodedData;
        next();
    } catch (error) {
        return sendResponse(res, StatusCodes.UNAUTHORIZED, "User is not authorized");
    }
}