import { userServiceFactory } from "../services/user.service.js";
import { describe, expect, jest, test } from '@jest/globals';

const userService = userServiceFactory();

describe('UserService', () => {
    let login = 'testuserservice';

    test('createUser', async () => {
        const password = '1234';

        const spyCreateUser = jest.spyOn(userService, 'createUser');
        await spyCreateUser(login, password);
        expect(spyCreateUser).toHaveBeenCalled();
    });

    let userByLogin;

    test('getUserByLogin', async () => {
        userByLogin = await userService.getUserByLogin(login, true, true, false);
        expect(userByLogin.login).toBe(login);
    });

    test('getUserById', async () => {
        const user = await userService.getUserById(userByLogin.id, true, false, false, false);
        expect(user.login).toBe(login);
    });

    test('updateUser', async () => {
        const login = 'pirate';
        const password = '0000';

        const spyUpdateUser = jest.spyOn(userService, 'updateUser');
        await spyUpdateUser(userByLogin.id, login, password);
        expect(spyUpdateUser).toHaveBeenCalled();
    });

    test('deleteUser', async () => {
        const spyDeleteUser = jest.spyOn(userService, 'deleteUser');
        await spyDeleteUser(userByLogin.id);
        expect(spyDeleteUser).toHaveBeenCalled();
    });
});