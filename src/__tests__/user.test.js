import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../index.js';
import { http } from '../index.js';
import { userServiceFactory } from '../services/user.service.js';
import { generateAccessToken } from '../services/token.service.js';

const userService = userServiceFactory();

describe('user routes test', () => {
    let user;

    beforeAll(async () => {
        const login = "newuser";
        const password = "1234";
        await userService.createUser(login, password);
        user = await userService.getUserByLogin(login, true, false, false);
    });

    describe('getUserInfo', () => {
        test('user is not authorized', async () => {
            const { body, statusCode } = await supertest(app).get('/api/user/' + user.id);
            expect(statusCode).toBe(401);
            expect(body.message).toBe('User is not authorized');
        });

        test('wrong token', async () => {
            const token = generateAccessToken("adsgagadfdasf");

            const { body, statusCode } = await supertest(app).get('/api/user/' + user.id)
            .set('Authorization', "Bearer " + token);

            expect(statusCode).toBe(400);
            expect(body.message).toBe('Nice try!');
        });

        test('get user info successfull', async () => {
            const token = generateAccessToken(user.id);

            const { body, statusCode } = await supertest(app).get('/api/user/' + user.id)
            .set('Authorization', "Bearer " + token);

            expect(statusCode).toBe(200);
            expect(body.message).toBe('Get user info successfull');
        });
    });

    describe('update', () => {
        test('update password successfull', async () => {
            const token = generateAccessToken(user.id);
            const password = "1234";
            const data = { password: password };

            const { body, statusCode } = await supertest(app).put('/api/user/' + user.id)
            .set('Authorization', "Bearer " + token)
            .send(data);

            expect(statusCode).toBe(200);
            expect(body.message).toBe('Change info successfull');
        });

        test('update login successfull', async () => {
            const token = generateAccessToken(user.id);
            const login = "newnewuser";
            const data = { login: login };

            const { body, statusCode } = await supertest(app).put('/api/user/' + user.id)
            .set('Authorization', "Bearer " + token)
            .send(data);

            expect(statusCode).toBe(200);
            expect(body.message).toBe('Change info successfull');
        });

        test('existing login', async () => {
            const token = generateAccessToken(user.id);
            const login = "vova";
            const password = "zzzz";
            const data = { login: login, password: password };

            const { body, statusCode } = await supertest(app).put('/api/user/' + user.id)
            .set('Authorization', "Bearer " + token)
            .send(data);

            expect(statusCode).toBe(403);
            expect(body).toBe('User ' + login + ' already exist!');
        });

        test('update user data successfull', async () => {
            const token = generateAccessToken(user.id);
            const login = "0000";
            const password = "4444";
            const data = { login: login, password: password };

            const { body, statusCode } = await supertest(app).put('/api/user/' + user.id)
            .set('Authorization', "Bearer " + token)
            .send(data);

            expect(statusCode).toBe(200);
            expect(body.message).toBe('Change info successfull');
        });
    });

    describe('delete', () => {
        test('delete user successfull', async () => {
            const token = generateAccessToken(user.id);

            const { body, statusCode } = await supertest(app).delete('/api/user/' + user.id)
            .set('Authorization', "Bearer " + token);

            expect(statusCode).toBe(200);
            expect(body.message).toBe('Delete user successfull');
        });
    });

    afterAll(() => {
        http.close();
    });
});