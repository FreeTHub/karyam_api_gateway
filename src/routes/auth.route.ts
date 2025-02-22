import { Router } from 'express';
import { LoginDTO } from '../dtos/login.dto';
import { AuthController } from '../http/controllers/auth.controller';
import DTOValidationMiddleware from '../http/middlewares/apiValidator.middleware';
import { Routes } from '../interfaces/routes.interface';

export class AuthRoute implements Routes {
	path?: string | undefined;
	router: Router;
	constructor() {
		this.router = Router();
		this.path = `/auth`;
		this.initializeRoutes();
	}
	private initializeRoutes(): void {

		// this.router.post(`${this.path}/getting-started`, DTOValidationMiddleware(GettingStartedDTO), UserController.gettingStarted);
		// this.router.post(`${this.path}/registration`, DTOValidationMiddleware(RegistrationDTO), UserController.registerHandler);
		 this.router.post(`${this.path}/login`, DTOValidationMiddleware(LoginDTO), AuthController.signin);
		// this.router.post(`${this.path}/verify-otp`, DTOValidationMiddleware(VerifyOTP), UserController.verifyOTPForLogin);
	}
}
