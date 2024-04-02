import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.SECRET;

export function generateAccessToken(id) {
    const payload = {
        id
    };
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

export function decodeAccessToken(token) {
    return jwt.verify(token, secret);
}