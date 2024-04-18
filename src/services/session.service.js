import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SessionService {
    async createSession(token, mapId) {
        return await prisma.sessions.create({
            data: {
                token: token,
                mapId: mapId,
            },
            select: {
                id: true,
            },
        });
    }

    async createUserSession(userId, sessionId, isAdmin) {
        await prisma.usersSessions.create({
            data: {
                userId: userId,
                sessionId: sessionId,
                isAdmin: isAdmin,
            },
        });
    }

    async checkSession(token, id, mapId) {
        return await prisma.sessions.findUnique({
            where: {
                token: token,
            },
            select: {
                id: id,
                mapId: mapId,
            },
        });
    }

    async checkUserSession(userId, sessionId) {
        return await prisma.usersSessions.findUnique({
            where: {
                userId_sessionId: {
                    userId: userId,
                    sessionId: sessionId,
                },
            },
            select: {
                id: true,
            },
        });
    }
};

export function sessionServiceFactory() {
    return new SessionService();
}