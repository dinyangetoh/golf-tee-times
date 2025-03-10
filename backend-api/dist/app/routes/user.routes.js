import { login, registerUser } from '../controllers/user.controller';
export default (router, requestMiddlewares) => {
    router.post('/login', login);
    router.post('/user', ...requestMiddlewares, registerUser);
};
//# sourceMappingURL=user.routes.js.map