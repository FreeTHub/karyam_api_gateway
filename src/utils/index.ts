import jwt from 'jsonwebtoken';
import { createTransport, SendMailOptions } from 'nodemailer';
export class UtilsMain {
	static generateToken(userId: any): { accessToken: string; refreshToken: string } {
		const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '7d' });
		const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '30d' });
		return { accessToken, refreshToken };
	}
	static async sendMailMethod(mailOptions: SendMailOptions): Promise<boolean> {
		const transporter = createTransport({
			//@ts-ignore
			host: 'smtp.gmail.com',
			secureConnection: false, // TLS requires secureConnection to be false
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD
			},
			tls: {
				rejectUnAuthorized: true
			}
		});
		return new Promise((resolve, reject) => {
			transporter.sendMail(mailOptions, (error, _) => {
				if (error) return reject(false);
				return resolve(true);
			});
		});
	}
	static GetMailOptions({
		to,
		name,
		otp,
		subject,
		expirationTime
	}: {
		subject: string;
		to: string;
		name: string;
		otp: string;
		expirationTime?: number;
	}): SendMailOptions {
		const mailOptions: SendMailOptions = {
			from: process.env.EMAIL_USERNAME!,
			to,
			subject,
			html:
				`

              <h1 style="text-align:center">Dostbook</h1>
              <p style="text-align:center"> <small>Connect Safely with your friends</small></p>
              <p></p>
              <p></p>
              <p></p>
              <p style="text-align:justify">Hi ${name}, Welcome to Dostbook  </p>
              </p>
              <p style="text-align:justify"> Your One Time Password is :  ${otp}</p>
      ` + expirationTime
					? `<p style="text-align:justify;font-size:11px">This OTP will expire in ${expirationTime} seconds</p>`
					: ''
		};
		return mailOptions;
	}
	static generateOTP(otpLength: number = 6): string {
		const digits = '0123456789abcdefghijklmnopqrstuvwxyz';

		let otp: string = '';

		[...new Array(otpLength)].forEach((self, index) => {
			otp = otp + digits[Math.floor(Math.random() * digits.length)];
		});
		return otp;
	}
}



/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const SERVICES=["AUTHSERVICE"]