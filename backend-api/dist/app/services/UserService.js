import { comparePassword, hashPassword } from '../helpers/password.helper';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES, JWT_SECRET } from '../../constants';
export default class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async registerUser(registerUserDto) {
        const { email, password } = registerUserDto;
        const passwordHash = await hashPassword(password);
        try {
            await this.userRepository.createUser(email, passwordHash);
        }
        catch (error) {
            throw error;
        }
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        try {
            const user = await this.userRepository.getUser(email);
            const isValidPassword = await comparePassword(password, user?.passwordHash || '');
            if (!user || !isValidPassword) {
                throw new Error('Invalid email or password');
            }
            const token = jwt.sign({
                userId: user.id,
                email: email,
            }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
            return { token };
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=UserService.js.map