import bcrypt from 'bcryptjs';

class CryptoService {
    hashPassword(password) {
        return bcrypt.hashSync(password, 7);
    }

    validPassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
};

export function cryptoServiceFactory() {
    return new CryptoService();
}