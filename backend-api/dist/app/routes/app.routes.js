import { getWelcome } from '../controllers/app.controller';
export default (router, requestMiddlewares) => {
    router.get('/', ...requestMiddlewares, getWelcome);
};
//# sourceMappingURL=app.routes.js.map