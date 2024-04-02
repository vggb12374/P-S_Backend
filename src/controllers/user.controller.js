import { logger } from '../handlers/logger.js';
import { userServiceFactory } from '../services/user.service.js';
const userService = userServiceFactory();
import { cryptoServiceFactory } from '../services/crypto.service.js';
const cryptoService = cryptoServiceFactory();
import { generateAccessToken } from '../services/token.service.js';
import { StatusCodes } from 'http-status-codes';
import e from 'express';

export class UserController {
    constructor() {
        this.register = logger(this.register.bind(this));
        this.login = logger(this.login.bind(this));
    }

    async register(req, res) {
        const { login, password } = req.body;
        if (await userService.getUserByLogin(login)) {
            return res.status(StatusCodes.FORBIDDEN).json("User " + login + " already exist!");
        }
        const hashedPassword = cryptoService.hashPassword(password);
        await userService.createUser(login, hashedPassword);
        return res.json("Registration successful");
    }

    async login(req, res) {
        const { login, password } = req.body;
        const user = await userService.getUserByLogin(login);
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json("User " + login + " does not exist!");
        }
        const hashedPassword = await userService.getPassByLogin(login);
        const validatedPassword = cryptoService.validPassword(password, hashedPassword.password);
        if (!validatedPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json("Wrong password!");
        }
        const token = generateAccessToken(user.id);
        return res.json({token});
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }       
    }

    async update(req, res) {
        try {
            const { login, password } = req.body;
            if (!login) {
                const hashedPassword = cryptoService.hashPassword(password);
                await userService.updateUserPass(req.params.id, hashedPassword);
                return res.json('Change info successfull');
            }
            if (await userService.getUserByLogin(login)) {
                return res.status(StatusCodes.FORBIDDEN).json("User " + login + " already exist!");
            }
            if (!password) {
                await userService.updateUserLogin(req.params.id, login);
                return res.json('Change info successfull');
            }
            const hashedPassword = cryptoService.hashPassword(password);
            await userService.updateUser(req.params.id, login, hashedPassword);
            return res.json('Change info successfull');
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }      
    }

    async delete(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            return res.json('Delete user successfull');
        } catch (error) {
            res.status(500).json(error);
        }
    }
};