import axios, { AxiosResponse } from 'axios';
import { LoginDTO } from '../../dtos/login.dto';
import { APIMETHODS } from '../../utils';
import { AxiosService } from './axios.service';

export let axiosAuthInstance: ReturnType<typeof axios.create>;
export class AuthService {
	private axiosService: AxiosService;

	constructor() {
		this.axiosService = new AxiosService({ baseurl: `${process.env.AUTH_SERVER_URL}/api`, serviceName: 'AUTHSERVICE' });
		axiosAuthInstance = this.axiosService.axios;
	}
	async signIn(body: LoginDTO): Promise<AxiosResponse> {
		// const response: AxiosResponse = await this.axiosService.axios.post('/signin', body);
		const response: AxiosResponse = await this.axiosService.invokeService({ suburl: '/signin', apiMethods: APIMETHODS.post, body });
		return response;
	}
	async getHealthStatusOfAuthServer() {
		console.log('start');
		// const response: AxiosResponse = await this.axiosService.axios.get('/health/');
		const response: AxiosResponse = await this.axiosService.invokeService({ suburl: '/health', apiMethods: APIMETHODS.get, body: {} });
		console.log('response: 23 >>>>>>>>>>>>>>> ', response?.data);
		console.log('end');
		return response?.data;
	}
}
