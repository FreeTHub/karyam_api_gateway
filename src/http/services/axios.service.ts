import axios from 'axios';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import keysDocumentsModel from '../../schema/keysDocuments.schema';
import { APIMETHODS, SERVICES } from '../../utils';
config({ path: '.env.local' });
export class AxiosService {
	private readonly baseurl: string;
	private readonly serviceName: string;
	public axios: any;
	constructor({ baseurl, serviceName }: { baseurl: string; serviceName: string }) {
		this.baseurl = baseurl;
		this.serviceName = serviceName;
	}
	public async invokeService({ suburl, apiMethods, body }: { apiMethods: APIMETHODS; suburl: string; body: any }): Promise<any> {
		let jwtGatewayToken: string = '';

		if (SERVICES.includes(this.serviceName)) {
			const _keysDocuments = await keysDocumentsModel.find();
			const _gatewaysecretToken = _keysDocuments.find((self) => self.keyName === 'gateway_token');
			const authServerGatewaySignature = _keysDocuments.find((self) => self.keyName === 'auth_server_gateway_signature');

			const expiresDateTimeStamp = new Date().toISOString(); // expiry date
			jwtGatewayToken = sign(
				{ id: this.serviceName, expiresDateTimeStamp, gatewayToken: _gatewaysecretToken?.valueName ?? 'secret' },
				authServerGatewaySignature?.valueName ?? 'secret',
				{ expiresIn: 60 * 1000, algorithm: 'HS256' }
			);

			console.log('====================================');
			console.log('34 hit');
			console.log('====================================');

			const instance: ReturnType<typeof axios.create> = axios.create({
				baseURL: this.baseurl,
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					jwtGatewayToken
				}
			});
			switch (apiMethods) {
				case APIMETHODS.get:
					return instance.get(suburl);
				case APIMETHODS.post:
					return instance.post(suburl, body);
				case APIMETHODS.put:
					return instance.put(suburl, body);
				case APIMETHODS.delete:
					return instance.delete(suburl, body);
				default:
					return;
			}
		}
	}
}
