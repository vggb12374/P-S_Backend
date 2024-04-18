import { logger } from '../handlers/logger.js';
import { userServiceFactory } from '../services/user.service.js';
import { cryptoServiceFactory } from '../services/crypto.service.js';
import { generateAccessToken } from '../services/token.service.js';
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';
import e from 'express';

const userService = userServiceFactory();
const cryptoService = cryptoServiceFactory();

export class UserController {
    constructor() {
        this.register = logger(this.register.bind(this));
        this.login = logger(this.login.bind(this));
    }

    async register(req, res) {
        const { login, password } = req.body;

        if (await userService.getUserByLogin(login, false, true, false)) {
            return sendResponse(res, StatusCodes.FORBIDDEN, "User " + login + " already exist!");
        }

        const hashedPassword = cryptoService.hashPassword(password);
        await userService.createUser(login, hashedPassword);
        return sendResponse(res, StatusCodes.OK, "Registration successfull", true);

        // if (await userService.getUserByLogin(login)) {
        //     return sendResponse(res, StatusCodes.FORBIDDEN, "User " + login + " already exist!");
        // }
        // const hashedPassword = cryptoService.hashPassword(password);
        // await userService.createUser(login, hashedPassword);
        // return sendResponse(res, StatusCodes.OK, "Registration successful");
    }

    async login(req, res) {
        const { login, password } = req.body;

        const user = await userService.getUserByLogin(login, true, false, true);
        if (!user) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, "Wrong login or password!");
        }

        const validatedPassword = cryptoService.validPassword(password, user.password);
        if (!validatedPassword) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, "Wrong login or password!");
        }

        const token = generateAccessToken(user.id);
        return sendResponse(res, StatusCodes.OK, "Successfull login", token);

        // const user = await userService.getUserByLogin(login);
        // if (!user) {
        //     return sendResponse(res, StatusCodes.BAD_REQUEST, "User " + login + " does not exist!");
        // }
        // const hashedPassword = await userService.getPassByLogin(login);
        // const validatedPassword = cryptoService.validPassword(password, hashedPassword.password);
        // if (!validatedPassword) {
        //     return sendResponse(res, StatusCodes.BAD_REQUEST, "Wrong password!");
        // }
        // const token = generateAccessToken(user.id);
        // return sendResponse(res, StatusCodes.OK, "Successfull login", token);
    }

    async getUserInfo(req, res) {
        try {
            if (req.user.id !== req.params.id) {
                return sendResponse(res, StatusCodes.BAD_REQUEST, "Nice try!");
            }

            const user = await userService.getUserById(req.params.id, true, false, true, true);
            return sendResponse(res, StatusCodes.OK, "Get user info successfull", user);
        } catch (error) {
            res.status(500).json(error);
        }       
    }

    async update(req, res) {
        try {
            const { login, password } = req.body;

            if (req.user.id !== req.params.id) {
                return sendResponse(res, StatusCodes.BAD_REQUEST, "Nice try!");
            }

            if (!login) {
                const user = await userService.getUserById(req.params.id, true, false, false, false);
                const hashedPassword = cryptoService.hashPassword(password);
                await userService.updateUser(req.params.id, user.login, hashedPassword);
                return sendResponse(res, StatusCodes.OK, "Change info successfull");
            }

            if (await userService.getUserByLogin(login, false, true, false)) {
                return res.status(StatusCodes.FORBIDDEN).json("User " + login + " already exist!");
            }

            if (!password) {
                const user = await userService.getUserById(req.params.id, false, true, false, false);
                await userService.updateUser(req.params.id, login, user.password);
                return sendResponse(res, StatusCodes.OK, "Change info successfull");
            }

            const hashedPassword = cryptoService.hashPassword(password);
            await userService.updateUser(req.params.id, login, hashedPassword);
            return sendResponse(res, StatusCodes.OK, "Change info successfull");
            
            // if (!login) {
            //     const hashedPassword = cryptoService.hashPassword(password);
            //     await userService.updateUserPass(req.params.id, hashedPassword);
            //     return sendResponse(res, StatusCodes.OK, "Change info successfull");
            // }
            // if (await userService.getUserByLogin(login)) {
            //     return res.status(StatusCodes.FORBIDDEN).json("User " + login + " already exist!");
            // }
            // if (!password) {
            //     await userService.updateUserLogin(req.params.id, login);
            //     return sendResponse(res, StatusCodes.OK, "Change info successfull");
            // }
            // const hashedPassword = cryptoService.hashPassword(password);
            // await userService.updateUser(req.params.id, login, hashedPassword);
            // return sendResponse(res, StatusCodes.OK, "Change info successfull");
        } catch (error) {
            res.status(500).json(error);
        }      
    }

    async delete(req, res) {
        try {
            if (req.user.id !== req.params.id) {
                return sendResponse(res, StatusCodes.BAD_REQUEST, "Nice try!");
            }
            
            await userService.deleteUser(req.params.id);
            return sendResponse(res, StatusCodes.OK, "Delete user successfull");
        } catch (error) {
            res.status(500).json(error);
        }
    }
};