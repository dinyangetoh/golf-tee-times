import 'reflect-metadata';
import teeTimeRoutes from './app/routes/teeTimeRoutes';
export default class App {
    constructor(expressApp, expressRouter, plugins, requestMiddlewares) {
        this.expressApp = expressApp;
        this.expressRouter = expressRouter;
        this.plugins = plugins;
        this.requestMiddlewares = requestMiddlewares;
    }
    initialize() {
        this.loadPlugins();
        this.loadRoutes();
        this.expressApp.use(this.expressRouter);
    }
    startServer(port) {
        this.initialize();
        this.expressApp.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    loadPlugins() {
        this.plugins.forEach((plugin) => {
            this.expressApp.use(plugin);
        });
    }
    loadRoutes() {
        this.expressApp.use('/api/tee-times', teeTimeRoutes);
    }
}
//# sourceMappingURL=app.js.map