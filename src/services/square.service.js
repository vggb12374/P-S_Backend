import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class SquareService {
    async checkSquare(x, y, sessionId) {
        const square = await prisma.squares.upsert({
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
        return square;
    }

    async createAvailableSquare(squareId, userSessionId, isCurrentPosition) {
        const availableSquare = await prisma.availableSquares.create({
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
        return availableSquare;
    }
    
    async getAvailableSquares(userSessionId) {
        const availableSquares = await prisma.availableSquares.findMany({
            where: {
                userSessionId: userSessionId,
            },
            select: {
                id: true,
                squareId: true,
                userSessionId: true,
                isCurrentPosition: true,
                Squares: {
                    select: {
                        id: true,
                        x: true,
                        y: true,
                        event: true,
                    },
                },
            },
        });
        return availableSquares;
    }
};

export function squareServiceFactory() {
    return new SquareService();
}