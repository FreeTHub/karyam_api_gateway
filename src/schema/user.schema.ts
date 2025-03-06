import bcryptjs from 'bcryptjs';
import { Schema, model } from 'mongoose';
import validator from 'validator';

export interface IUserSchema extends Document {
	name: string;
	email: string;
	phoneNumber: string;
	isSpam: boolean;
	isFraudCount: number;
	password: string;
	googleId?: string;
}

export const UserSchema: Schema<IUserSchema> = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide a name'],
			minlength: 3,
			maxlength: 50,
			trim: true
		},

		email: {
			type: String,
			required: [true, 'Please provide an email'],
			unique: true,
			validate(val: string) {
				if (!validator.isEmail(val)) {
					throw new Error('email is not valid');
				}
			}
		},
		googleId: {
			type: String,
			required: false
		},
		phoneNumber: {
			type: String,
			required: false,
			validate: [validator.isMobilePhone, 'Please provide a valid phone number']
		},
		isSpam: {
			type: Boolean,
			default: false
		},
		isFraudCount: {
			type: Number,
			default: 0
		},
		password: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

UserSchema.methods = {
	checkSpanStatus: async function (password: string) {
		if (this.isFraudCount >= 10) this.isSpam = true;
	},
	authenticate: async function (password: string) {
		return await bcryptjs.compare(password, this.passport);
	}
};
UserSchema.pre('save', async function (next) {
	if (!this.isModified) next();
	this.name = this.name.toLowerCase();
	const salt = await bcryptjs.genSalt(10);
	this.password = await bcryptjs.hash(this.password, salt);
});
const UserModel = model('User', UserSchema);
export default UserModel;
