import { Trim } from 'class-sanitizer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class LoginDTO {
	@IsEmail({}, { message: 'Provided Email is not valid' })
	@IsNotEmpty()
	@Trim()
	email: string | undefined;
	@IsPhoneNumber()
	@IsString()
	@IsNotEmpty()
	@Trim()
	phoneNumber: string | undefined;
}

export class VerifyOTP {
	@IsEmail({}, { message: 'Provided Email is not valid' })
	@IsNotEmpty()
	@Trim()
	email: string | undefined;
	@IsString()
	@IsNotEmpty()
	@Trim()
	otp: string | undefined;
}
