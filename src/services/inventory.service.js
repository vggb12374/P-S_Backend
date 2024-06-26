import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class InventoryService {
    async addResToInventory(resourceId, userSessionId) {
        return await prisma.inventories.upsert({
            where: {
                resourceId_userSessionId: {
                    resourceId: resourceId,
                    userSessionId: userSessionId,
                },
            },
            update: {
                resourceId: resourceId,
                userSessionId: userSessionId,
            },
            create: {
                resourceId: resourceId,
                userSessionId: userSessionId,
                amount: 1,
            },
            select: {
                id: true,
                resourceId: true,
                userSessionId: true,
                amount: true,
            },
        });
    }

    async getUserInventory(userSessionId) {
        return await prisma.inventories.findMany({
            where: {
                userSessionId: userSessionId,
            },
            select: {
                id: true,
                resourceId: true,
                userSessionId: true,
                amount: true,
            },
        });
    }
};

export function inventoryServiceFactory() {
    return new InventoryService();
}