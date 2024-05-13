import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../index.js';
import { http } from '../index.js';
import { userServiceFactory } from '../services/user.service.js';
import { resourceServiceFactory } from '../services/resource.service.js';
import { generateAccessToken } from '../services/token.service.js';
import { generateSessionToken } from '../services/token.service.js';
import { mapServiceFactory } from '../services/map.service.js';
import { sessionServiceFactory } from '../services/session.service.js';

const sessionService = sessionServiceFactory();
const mapService = mapServiceFactory();
const userService = userServiceFactory();
const resourceService = resourceServiceFactory();

describe('inventory routes test', () => {
    let resources;
    let user;
    let accessToken;
    let session;
    let sessionToken;

    beforeAll(async () => {
        resources = await resourceService.getResources();

        const login = "inventorytest";
        user = await userService.getUserByLogin(login, true, false, false);

        if (!user) {
            const password = "1234";
            await userService.createUser(login, password);
            user = await userService.getUserByLogin(login, true, false, false);
        }

        accessToken = generateAccessToken(user.id);
        const map = await mapService.getMaps();
        sessionToken = generateSessionToken(user.id);

        await sessionService.createSession(sessionToken, map[0].id);
        session = await sessionService.checkSession(sessionToken, true, false);
        await sessionService.createUserSession(user.id, session.id, true);
    });

    describe('addResToInventory', () => {
        test('user is not auhorized', async () => {
            const data = { resourceId: resources[0].id };

            const { body, statusCode } = await supertest(app).post('/api/sessions/inventories').send(data);
            expect(statusCode).toBe(401);
            expect(body.message).toBe('User is not authorized');
        });

        test('no session token', async () => {
            const token = generateAccessToken(user.id);
            const data = { resourceId: resources[0].id };

            const { body, statusCode } = await supertest(app).post('/api/sessions/inventories')
            .set('Authorization', "Bearer " + token)
            .send(data);

            expect(statusCode).toBe(404);
            expect(body.message).toBe('Session not found');
        });

        test('wrong session token', async () => {
            const accessToken = generateAccessToken(user.id);
            const sessionToken = generateSessionToken("id");
            const data = { resourceId: resources[0].id };

            const { body, statusCode } = await supertest(app).post('/api/sessions/inventories')
            .set('Authorization', "Bearer " + accessToken + " Session " + sessionToken)
            .send(data);

            expect(statusCode).toBe(403);
            expect(body.message).toBe('Session not found');
        });

        test('add resource to inventory successfull', async () => {
            const data = { resourceId: resources[0].id };

            const { body, statusCode } = await supertest(app).post('/api/sessions/inventories')
            .set('Authorization', "Bearer " + accessToken + " Session " + sessionToken)
            .send(data);

            expect(statusCode).toBe(200);
            expect(body.message).toBe('Resource added to inventory');
        });
    });

    describe('getUserInventory', () => {
        test('get user inventory successfull', async () => {
            const { body, statusCode } = await supertest(app).get('/api/sessions/inventories')
            .set('Authorization', "Bearer " + accessToken + " Session " + sessionToken);

            expect(statusCode).toBe(200);
            expect(body.message).toBe('Get user inventory successfully');
        });
    });

    afterAll(() => {
        http.close();
    });
});