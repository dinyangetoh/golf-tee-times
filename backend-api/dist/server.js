import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import App from './app';
import { APP_PORT } from './constants';
dotenv.config();
// Express App
const expressApp = express();
// Express Router
const expressRouter = express.Router();
// Plugins
const plugins = [bodyParser.json()];
// Configurable Request Middlewares
const requestMiddlewares = [];
const app = new App(expressApp, expressRouter, plugins, requestMiddlewares);
// Start Server here
app.startServer(APP_PORT);
//# sourceMappingURL=server.js.map