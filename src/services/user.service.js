import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserService {
    async getUserByLogin(login) {
        const user = await prisma.users.findUnique({
            where: {
                login: login,
            },
            select: {
                id: true,
                login: true,
            },
        });
        return user;
    }

    async createUser(login, password) {
        await prisma.users.create({
            data: {
                login: login,
                password: password,
            },
        });
    }
    
    async getPassByLogin(login) {
        const user = await prisma.users.findUnique({
            where: {
                login: login,
            },
            select: {
                password: true,
            },
        });
        return user;
    }
    
    async getUserById(id) {
        const user = await prisma.users.findUnique({
            where: {
                id: id,
            },
            select: {
                login: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }

    async updateUserLogin(id, login) {
        await prisma.users.update({
            where: {
                id: id,
            },
            data: {
                login: login,
            },
        });
    }

    async updateUserPass(id, password) {
        await prisma.users.update({
            where: {
                id: id,
            },
            data: {
                password: password,
            },
        });
    }

    async updateUser(id, login, password) {
        await prisma.users.update({
            where: {
                id: id,
            },
            data: {
                login: login,
                password: password,
            },
        });
    }

    async deleteUser(id) {
        await prisma.users.delete({
            where: {
                id: id,
            },
        });
    }
};

export function userServiceFactory() {
    return new UserService();
}