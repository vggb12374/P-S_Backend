import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ResourceService {
    async getResources() {
        return await prisma.resources.findMany({
            select: {
                id: true,
                name: true,
                type: true,
            },
        });
    }
};

export function resourceServiceFactory() {
    return new ResourceService();
}