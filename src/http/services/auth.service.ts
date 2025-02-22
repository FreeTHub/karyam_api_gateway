import axios, { AxiosResponse } from 'axios';
import { LoginDTO } from '../../dtos/login.dto';
import { AxiosService } from './axios.service';

export let axiosAuthInstance: ReturnType<typeof axios.create>;
export class AuthService {
	private axiosService: AxiosService;

	constructor() {
		this.axiosService = new AxiosService({ baseurl: `${process.env.AUTH_SERVER_URL}/api/v1`, serviceName: 'AUTH' });
		axiosAuthInstance = this.axiosService.axios;
	}
	async signIn(body: LoginDTO): Promise<AxiosResponse> {
		const response: AxiosResponse = await this.axiosService.axios.post('/signin', body);
		return response;
	}
}
