import { validationServiceFactory } from '../services/validation.service.js';
import { describe, expect, test } from '@jest/globals';

const validationService = validationServiceFactory();

describe('ValidationService', () => {
    test('authValidation', () => {
        const login = 'vova';
        const password = '1234';

        const { error } = validationService.authValidation(login, password);
        expect(error).toBeUndefined();
    });

    test('updateValidation', () => {
        const login = 'user';
        const password = '0000';

        const { error } = validationService.updateValidation(login, password);
        expect(error).toBeUndefined();
    });
});