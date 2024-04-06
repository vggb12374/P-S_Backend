import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

await prisma.maps.upsert({
    where: {
        source: "src/static/maps/map_128.png",
    },
    update: {},
    create: {
        source: "src/static/maps/map_128.png",
    },
});

await prisma.resources.upsert({
    where: {
        type: 0,
    },
    update: {},
    create: {
        name: "Rope",
        type: 0,
    },
});

await prisma.resources.upsert({
    where: {
        type: 1,
    },
    update: {},
    create: {
        name: "Spear",
        type: 1,
    },
});

await prisma.resources.upsert({
    where: {
        type: 2,
    },
    update: {},
    create: {
        name: "Rum",
        type: 2,
    },
});

await prisma.resources.upsert({
    where: {
        type: 3,
    },
    update: {},
    create: {
        name: "Axe",
        type: 3,
    },
});

await prisma.resources.upsert({
    where: {
        type: 4,
    },
    update: {},
    create: {
        name: "Pickaxe",
        type: 4,
    },
});

await prisma.resources.upsert({
    where: {
        type: 5,
    },
    update: {},
    create: {
        name: "Shovel",
        type: 5,
    },
});