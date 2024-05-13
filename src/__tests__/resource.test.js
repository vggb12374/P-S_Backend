import { afterAll, describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../index.js';
import { http } from '../index.js';
import { generateAccessToken } from '../services/token.service.js';

describe('resource routes test', () => {    
    describe('getResources', () => {
        test('user is not authorized', async () => {
            const { body, statusCode } = await supertest(app).get('/api/resources');
            expect(statusCode).toBe(401);
            expect(body.message).toBe('User is not authorized');
        });

        test('get resources successfull', async () => {
            const token = generateAccessToken('id');

            const { body, statusCode } = await supertest(app).get('/api/resources')
            .set('Authorization', "Bearer " + token);

            expect(statusCode).toBe(200);
            expect(body.message).toBe('Get resources successfully');
        });
    });

    afterAll(() => {
        http.close();
    });
});