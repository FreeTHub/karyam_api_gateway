import cors from 'cors';
import { config } from 'dotenv';
import express, { Application, Request, Response, json, urlencoded } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFound } from './http/middlewares/errorHandler.middleware';
import RoutesMain from './routes';
import { logger } from './utils/logger';
config({path:".env.local"});
class ExpressApp {
	private app: Application;
	private PORT: unknown;
	private routesMain = new RoutesMain();
	constructor() {

		this.app = express();
		this.PORT = process.env.PORT ?? 5000;
		this.middleware();
		this.routes();
	}
	private middleware(): void {
		this.app.use(cors({ credentials: true, origin: '*', methods: 'GET,POST,PUT,DELETE' }));
		this.app.use(urlencoded({ extended: true, limit: '50mb' }));
		this.app.use(json({ limit: '50mb' }));
		this.app.use(helmet());
		this.app.use(morgan('dev'));
	}
	private routes(): void {
		this.app.get('/', (req: Request, res: Response) => {
			return res.send('<h2>Server is running .....</h2>');
		});
		this.routesMain.initializeAllRoutes(this.app);

		// put this at the last of all routes

		this.app.use(errorHandler);
		this.app.use(notFound);
	}
	public listen(): void {
		// connectDB();
		this.app.listen(this.PORT, () => {
			logger.info(`=================================`);
      logger.info(`🚀 App listening on the port ${this.PORT!}`);
      logger.info(`=================================`);
		});
	}
}

const server = new ExpressApp();
server.listen();
