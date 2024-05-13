import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../index.js';
import { http } from '../index.js';
import { mapServiceFactory } from '../services/map.service.js';
import { generateAccessToken } from '../services/token.service.js';
import { userServiceFactory } from '../services/user.service.js';
import { generateSessionToken } from '../services/token.service.js';

const mapService = mapServiceFactory();
const userService = userServiceFactory();

describe('session routes test', () => {
    let user;
    let newUser;

    beforeAll(async () => {
        let login = "test";
        const password = "1234";
        user = await userService.getUserByLogin(login, true, false, false);

        if (!user) {
            await userService.createUser(login, password);
            user = await userService.getUserByLogin(login, true, false, false);
        }

        login = "newtest";
        newUser = await userService.getUserByLogin(login, true, false, false);

        if (!newUser) {
            await userService.createUser(login, password);
            newUser = await userService.getUserByLogin(login, true, false, false);
        }
    });

    let sessionToken;

    describe('createSession', () => {
        test('user is not authorized', async () => {
            const map = await mapService.getMaps();
            const data = { mapId: map[0].id };

            const { body, statusCode } = await supertest(app).post('/api/sessions/create').send(data);
            expect(statusCode).toBe(401);
            expect(body.message).toBe('User is not authorized');
        });

        test('wrong map id', async () => {
            const token = generateAccessToken(user.id);
            const mapId = "cd968ac6-4d8d-4dbe-be9c-396884cd4fd4";
            const data = { mapId: mapId };

            const { body, statusCode } = await supertest(app).post('/api/sessions/create')
            .set('Authorization', "Bearer " + token)
            .send(data);

            expect(statusCode).toBe(400);
            expect(body.message).toBe('This map does not valid');
        });

        test('create session successfull', async () => {
            const token = generateAccessToken(user.id);
            const map = await mapService.getMaps();
            const data = { mapId: map[0].id };

            const { body, statusCode } = await supertest(app).post('/api/sessions/create')
            .set('Authorization', "Bearer " + token)
            .send(data);

            sessionToken = body.data;

            expect(statusCode).toBe(200);
            expect(body.message).toBe('Session created');
        });
    });

    describe('addUserOnSession', () => {
        test('wrong session token', async () => {
            const accessToken = generateAccessToken(user.id);
            const sessionToken = generateSessionToken("id");
            const data = { token: sessionToken };

            const { body, statusCode } = await supertest(app).post('/api/sessions/connect')
            .set('Authorization', "Bearer " + accessToken)
            .send(data);
            
            expect(statusCode).toBe(404);
            expect(body.message).toBe('Session not found');
        });

        test('connecting user already on session', async () => {
            const accessToken = generateAccessToken(user.id);
            const data = { token: sessionToken };

            const { body, statusCode } = await supertest(app).post('/api/sessions/connect')
            .set('Authorization', "Bearer " + accessToken)
            .send(data);
            
            expect(statusCode).toBe(200);
            expect(body.message).toBe('User already on session');
        });

        test('connecting new user', async () => {
            const accessToken = generateAccessToken(newUser.id);
            const data = { token: sessionToken };

            const { body, statusCode } = await supertest(app).post('/api/sessions/connect')
            .set('Authorization', "Bearer " + accessToken)
            .send(data);
            
            expect(statusCode).toBe(200);
            expect(body.message).toBe('User added on session');
        });
    });

    afterAll(() => {
        http.close();
    });
});