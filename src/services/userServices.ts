/* eslint-disable */
import axios from './axios';
import * as config from './../config/api';

export interface IUsersService {
    login(email: string, password: string): Promise<any>;
    logout(): Promise<void>;
}

export class UsersService implements IUsersService {
    public async logout(): Promise<void> {
        try {
            localStorage.clear();
        } catch (err) {
            console.log(err);
        }  
    }

    async login(email: string, password: string): Promise<any> {
        try {
            //ste1: save response of github user in our db
            const response = await axios.post(
                `${config.apiConfig.baseUrl}/v1/login`,
                {
                    email,
                    password,
                }
            );
            //step2: save user in localStorage
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new UsersService();
