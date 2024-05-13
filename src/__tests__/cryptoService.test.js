import { cryptoServiceFactory } from "../services/crypto.service.js";
import { describe, expect, test } from '@jest/globals';
import bcrypt from 'bcryptjs';

const cryptoService = cryptoServiceFactory();

describe('CryptoService', () => {
    let password = '1234';
    let hashedPassword;

    test('hashPassword', () => {
        hashedPassword = cryptoService.hashPassword(password);
        const validatePassword = bcrypt.compareSync(password, hashedPassword);
        expect(validatePassword).toBeTruthy();
    });

    test('validPassword', () => {
        const validatePassword = cryptoService.validPassword(password, hashedPassword);
        expect(validatePassword).toBeTruthy();
    });
});