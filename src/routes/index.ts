import { Application } from 'express';
import { Routes } from '../interfaces/routes.interface';
import { AuthRoute } from './auth.route';

class RoutesMain {
	private routes: Routes[] = [new AuthRoute()]; // add all routes  here
	constructor() {}
	public initializeAllRoutes(app: Application) {
		this.routes.forEach((route) => {
			app.use('/api/v1', route.router);
		});
	}
}

export default RoutesMain;
