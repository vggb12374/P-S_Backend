import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class MapService {
    async createMap(source) {
        await prisma.maps.create({
            data: {
                source: source,
            },
        });
    }

    async getMaps() {
        const maps = await prisma.maps.findMany({
            select: {
                id: true,
                source: true,
            },
        });
        return maps;
    }

    async getMapById(id) {
        return prisma.maps.findFirst({ where: { id } });
    }
};

export function mapServiceFactory() {
    return new MapService();
}