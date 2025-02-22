import axios from 'axios';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import keysDocumentsModel from '../../schema/keysDocuments.schema';
import { SERVICES } from '../../utils';
config({ path: '.env.local' });
export class AxiosService {
	private readonly baseurl: string;
	private readonly serviceName: string;
	public axios: any;
	constructor({ baseurl, serviceName }: { baseurl: string; serviceName: string }) {
		this.baseurl = baseurl;
		this.serviceName = serviceName;
		this.axiosCreateInstance().then((res) => {
			this.axios = res;
		});
	}
	public async axiosCreateInstance(): Promise<ReturnType<typeof this.axios.create>> {
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
			console.log('jwtGatewayToken: ', jwtGatewayToken);
			const instance: ReturnType<typeof this.axios.create> = axios.create({
				baseURL: this.baseurl,
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					jwtGatewayToken
				}
			});
			return instance;
		}
	}
}
