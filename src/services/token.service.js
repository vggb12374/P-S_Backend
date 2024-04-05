import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const tokenTime = process.env.TOKEN_TIME;
const secretSessionKey = process.env.SECRET_SESSION_KEY;

export function generateAccessToken(id) {
    const payload = {
        id
    };
    return jwt.sign(payload, secretAccessKey, {expiresIn: tokenTime});
}

export function decodeAccessToken(token) {
    return jwt.verify(token, secretAccessKey);
}

export function generateSessionToken(id) {
    const payload = {
        id
    };
    return jwt.sign(payload, secretSessionKey, {expiresIn: tokenTime});
}

export function decodeSessionToken(token) {
    return jwt.verify(token, secretSessionKey);
}