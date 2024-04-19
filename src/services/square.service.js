import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SquareService {
    async createSquare(x, y, sessionId, event) {
        return prisma.squares.create({ data: { x, y, sessionId, event }});
    }

    async checkSquare(x, y, sessionId) {
        return await prisma.squares.upsert({
            where: {
                x_y_sessionId: {
                    x: x,
                    y: y,
                    sessionId: sessionId,
                },
            },
            update: {},
            create: {
                x: x,
                y: y,
                sessionId: sessionId,
                event: null,
            },
            select: {
                id: true,
                x: true,
                y: true,
                event: true,
            },
        });
    }

    async createAvailableSquare(squareId, userSessionId, isCurrentPosition) {
        return await prisma.availableSquares.create({
            data: {
                squareId: squareId,
                userSessionId: userSessionId,
                isCurrentPosition: isCurrentPosition,
            },
            select: {
                id: true,
                squareId: true,
                userSessionId: true,
                isCurrentPosition: true,
            },
        });
    }
    
    async getAvailableSquares(userSessionId) {
        return await prisma.availableSquares.findMany({
            where: {
                userSessionId: userSessionId,
            },
            select: {
                id: true,
                squareId: true,
                userSessionId: true,
                isCurrentPosition: true,
                square: {
                    select: {
                        id: true,
                        x: true,
                        y: true,
                        event: true,
                    },
                },
            },
        });
    }

    async resetAllCurrentPosition(userSessionId) {
        return await prisma.availableSquares.updateMany({
            data: {
                isCurrentPosition: false
            },
            where: { userSessionId }
        });
      }
};

export function squareServiceFactory() {
    return new SquareService();
}