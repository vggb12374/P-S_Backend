import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class SessionService {
    async createSession(token, mapId) {
        const session = await prisma.sessions.create({
            data: {
                token: token,
                mapId: mapId,
            },
            select: {
                id: true,
            },
        });
        return session;
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

    async checkSession(token) {
        const session = await prisma.sessions.findUnique({
            where: {
                token: token,
            },
            select: {
                id: true,
                mapId: true,
            },
        });
        return session;
    }

    async chechUserSession(userId, sessionId) {
        const userSession = await prisma.usersSessions.findUnique({
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
        return userSession;
    }
};

export function sessionServiceFactory() {
    return new SessionService();
}