import { Router } from 'express';
import passport from 'passport';
import { GettingStartedDTO } from '../dtos/gettingStarted.dto';
import { LoginDTO, VerifyOTP } from '../dtos/login.dto';
import { RegistrationDTO } from '../dtos/registration.dto';
import { UserController } from '../http/controllers/user.controller';
import DTOValidationMiddleware from '../http/middlewares/apiValidator.middleware';
import { Routes } from '../interfaces/routes.interface';
export class UserRoute implements Routes {
	path?: string | undefined;
	router: Router;
	constructor() {
		this.router = Router();
		this.path = `/auth`;
		this.initializeRoutes();
	}
	private initializeRoutes(): void {
		this.router.post(`${this.path}/getting-started`, DTOValidationMiddleware(GettingStartedDTO), UserController.gettingStarted);
		this.router.post(`${this.path}/registration`, DTOValidationMiddleware(RegistrationDTO), UserController.registerHandler);
		this.router.post(`${this.path}/login`, DTOValidationMiddleware(LoginDTO), UserController.generateOTPForLogin);
		this.router.post(`${this.path}/verify-otp`, DTOValidationMiddleware(VerifyOTP), UserController.verifyOTPForLogin);
		this.router.get(
			`${this.path}/google/callback`,
			passport.authenticate('google', {
				failureRedirect: '/login/failed',
				session: false
			}),
			UserController.getGoogleLoginCTRL
		);
		this.router.post(`${this.path}/forgot-password-request`, UserController.forgotPasswordCTRL);
		this.router.post(`${this.path}/set-new-password`, UserController.setNewPasswordCTRL);
	}
}
