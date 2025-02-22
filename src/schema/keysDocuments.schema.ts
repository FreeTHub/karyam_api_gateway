import { Schema, model } from 'mongoose';

export interface IKeysDocuments extends Document {
	keyName:string;
	valueName:string;
}
export const keysDocumentsSchema: Schema<IKeysDocuments> = new Schema(
	{

		keyName: {
			type:String,
			required:true

		},
		valueName:{
			type:String,
			required:true
		}
	},
	{ timestamps: true }
);

const keysDocumentsModel = model('keys_document', keysDocumentsSchema);
export default keysDocumentsModel;
