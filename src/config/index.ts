import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export class configMain {
	static async connectDatabase() {
		try {
			await mongoose.set('strictQuery', true);
			await mongoose.connect(process.env.DATABASE_URL!, {
				// useNewUrlParser:true,
				// useUnifiedTopology:true,
				// directConnection:true,

				connectTimeoutMS: 15000
			});
		} catch (err) {
			console.log(`database not connected : ${err}`);
		}

		const { connection } = mongoose;
		if (connection.readyState >= 1) {
			logger.info('Mongodb database connected successfully');
			return;
		}
		connection.on('error', () => {
			logger.error(`database not connected try again`);
		});
	}
}
