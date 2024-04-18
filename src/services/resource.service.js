import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ResourceService {
    async getResources() {
        const resources = await prisma.resources.findMany({
            select: {
                id: true,
                name: true,
                type: true,
            },
        });
        return resources;
    }
};

export function resourceServiceFactory() {
    return new ResourceService();
}