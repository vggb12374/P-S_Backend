import bcrypt from 'bcryptjs';

export class CryptoService {
    hashPassword(password) {
        const hashedPassword = bcrypt.hashSync(password, 7);
        return hashedPassword;
    }

    validPassword(password, hashedPassword) {
        const validatedPassword = bcrypt.compareSync(password, hashedPassword);
        return validatedPassword;
    }
};