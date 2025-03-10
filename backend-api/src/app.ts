import { Application, RequestHandler, Router } from 'express';
import 'reflect-metadata';
import teeTimeRoutes from './app/routes/teeTimeRoutes';
import cors from 'cors';
import { APP_URL } from './constants';

export default class App {
    constructor(
        private readonly expressApp: Application,
        private readonly expressRouter: Router,
        private readonly plugins: RequestHandler[],
        private readonly requestMiddlewares: RequestHandler[],
    ) {}

    public initialize(): void {
        // Apply CORS first, before any other middleware
        this.expressApp.use(
            cors({
                origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // SvelteKit dev server
                credentials: true,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
            }),
        );

        // Handle preflight requests
        this.expressApp.options('*', cors());

        this.loadPlugins();
        this.loadRoutes();
        this.expressApp.use(this.expressRouter);
    }

    public startServer(port: number) {
        this.initialize();
        this.expressApp.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }

    private loadPlugins(): void {
        this.plugins.forEach((plugin) => {
            this.expressApp.use(plugin);
        });
    }

    private loadRoutes() {
        this.expressApp.use('/api/tee-times', teeTimeRoutes);
    }
}
