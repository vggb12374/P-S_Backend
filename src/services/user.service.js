import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserService {
    async getUserByLogin(login, id, selectLogin, password) {
        const user = await prisma.users.findUnique({
            where: {
                login: login,
            },
            select: {
                id: id,
                login: selectLogin,
                password: password,
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
    
    async getUserById(id, login, password, createdAt, updatedAt) {
        const user = await prisma.users.findUnique({
            where: {
                id: id,
            },
            select: {
                login: login,
                password: password,
                createdAt: createdAt,
                updatedAt: updatedAt,
            },
        });
        return user;
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