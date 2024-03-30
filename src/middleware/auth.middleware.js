import { decodeAccessToken } from '../services/token.service.js';

export function authMiddleware (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "User is not authorized"});
        }
        const decodedData = decodeAccessToken(token);
        req.user = decodedData;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: "User is not authorized"});
    }
}