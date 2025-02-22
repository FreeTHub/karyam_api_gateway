import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/logger";
import { AuthService } from "../services/auth.service";




export class AuthController{
	static async signin(req:Request,res:Response,next:NextFunction){
		try{
			const _authService = new AuthService();
			const body = req.body;
			const _signInResponse = await _authService.signIn(body);
			return res.status(200).json({status:200,data:_signInResponse});
		}catch(error){
			logger.error(error);
			next(error);
		}
	}
}