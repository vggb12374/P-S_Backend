import { logger } from '../handlers/logger.js';
import { UserService } from '../services/user.service.js';
const userService = new UserService();
import { CryptoService } from '../services/crypto.service.js';
const cryptoService = new CryptoService();
import { generateAccessToken } from '../services/token.service.js';

export class UserController {
    constructor() {
        this.register = logger(this.register.bind(this));
    }

    async register(req, res) {
        try {
            const { login, password } = req.body;
            if (await userService.getUserByLogin(login)) {
                return res.status(403).json("User " + login + " already exist!");
            }
            const hashedPassword = cryptoService.hashPassword(password);
            await userService.createUser(login, hashedPassword);
            return res.json("Registration successfull");
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;
            if (!await userService.getUserByLogin(login)) {
                return res.status(403).json("User " + login + " does not exist!");
            }
            const hashedPassword = await userService.getPassByLogin(login);
            const validatedPassword = cryptoService.validPassword(password, hashedPassword.password);
            if (!validatedPassword) {
                return res.status(403).json("Wrong password!");
            }
            const token = generateAccessToken(login);
            return res.json({token});
        } catch (error) {
            res.status(500).json(error);
        }
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
                return res.status(403).json("User " + login + " already exist!");
            }
            if (!password) {
                await userService.updateUserLogin(req.params.id, login);
                return res.json('Change info successfull');
            }
            const hashedPassword = cryptoService.hashPassword(password);
            await userService.updateUser(req.params.id, login, hashedPassword);
            return res.json('Change info successfull');
        } catch (error) {
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