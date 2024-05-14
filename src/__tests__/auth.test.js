import { afterAll, describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../index.js';
import { http } from '../index.js';
import { userServiceFactory } from '../services/user.service.js';
import info from './mock/register-mock.json';

const userService = userServiceFactory();

describe('auth routes test', () => {
    describe('register', () => {
        test('empty login', async () => {
            const login = "";
            const password = "1234";
            const data = { login: login, password: password };

            const { body, statusCode } = await supertest(app).post('/api/auth/register').send(data);
            expect(statusCode).toBe(400);
            expect(body.message).toBe('"login" is not allowed to be empty');
        });

        test('too short login', async () => {
            const login = "vov";
            const password = "1234";
            const data = { login: login, password: password };

            const { body, statusCode } = await supertest(app).post('/api/auth/register').send(data);
            expect(statusCode).toBe(400);
            expect(body.message).toBe('"login" length must be at least 4 characters long');
        });

        test('register existing user', async () => {
            const login = "vova";
            const password = "1234";
            const data = { login: login, password: password };

            const { body, statusCode } = await supertest(app).post('/api/auth/register').send(data);
            expect(statusCode).toBe(403);
            expect(body.message).toBe('User ' + login + ' already exist!');
        });

        test('register new user successfull', async () => {
            const login = "newuser";
            const password = "1234";
            const data = { login: login, password: password };

            const { body, statusCode } = await supertest(app).post('/api/auth/register').send(data);
            expect(statusCode).toBe(200);
            expect(body.message).toBe('Registration successfull');
        });
    });

    describe('login', () => {
        test('empty password', async () => {
            const login = "vova";
            const password = "";
            const data = { login: login, password: password };

            const { body, statusCode } = await supertest(app).post('/api/auth/login').send(data);
            expect(statusCode).toBe(400);
            expect(body.message).toBe('"password" is not allowed to be empty');
        });

        test('login nonexisting user', async () => {
            const login = "hadfdhafdhadfh";
            const password = "1234";
            const data = { login: login, password: password };

            const { body, statusCode } = await supertest(app).post('/api/auth/login').send(data);
            expect(statusCode).toBe(400);
            expect(body.message).toBe('Wrong login or password!');
        });

        test('wrong password', async () => {
            const login = "newuser";
            const password = "0000";
            const data = { login: login, password: password };

            const { body, statusCode } = await supertest(app).post('/api/auth/login').send(data);
            expect(statusCode).toBe(400);
            expect(body.message).toBe('Wrong login or password!');
        });

        test('successfull login', async () => {
            const login = "newuser";
            const password = "1234";
            const data = { login: login, password: password };

            const { body, statusCode } = await supertest(app).post('/api/auth/login').send(data);
            expect(statusCode).toBe(200);
            expect(body.message).toBe('Successfull login');
        });
    });

    describe('mock register', () => {
        test('successfull mock register', () => {
            info.forEach(async (element) => {
                const { body, statusCode } = await supertest(app).post('/api/auth/register').send(element);
                expect(statusCode).toBe(200);
                expect(body.message).toBe('Registration successfull');
            });
        });
    });

    afterAll(async () => {
        let login = "newuser";
        let user = await userService.getUserByLogin(login, true, false, false);
        await userService.deleteUser(user.id);

        login = "mockuser1";
        user = await userService.getUserByLogin(login, true, false, false);
        await userService.deleteUser(user.id);

        login = "mockuser2";
        user = await userService.getUserByLogin(login, true, false, false);
        await userService.deleteUser(user.id);

        http.close();
    });
});