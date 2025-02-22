
import { SERVICES } from '@/utils';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
config({path:".env.local"});
export class AxiosService {
	private readonly baseurl: string;
	private readonly serviceName: string;
	public axios: any;
	constructor({ baseurl, serviceName }: { baseurl: string; serviceName: string }) {
		this.baseurl = baseurl;
		this.serviceName = serviceName;
		this.axios = this.axiosCreateInstance();
	}
	public axiosCreateInstance(): ReturnType<typeof this.axios.create> {
		let gatewayToken: string ="";

		if (SERVICES.includes(this.serviceName)) {
			const expiresIn = new Date().getTime() + 60 * 1000;
			gatewayToken = sign({ id: this.serviceName, expiresIn }, process.env.GATEWAY_TOKEN_SECRET!);
			const instance: ReturnType<typeof this.axios.create> = this.axios.create({
				baseURL: this.baseurl,
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					gatewayToken
				}
			});
			return gatewayToken;
		}
	}
}
