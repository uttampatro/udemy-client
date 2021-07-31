import axios from './axios';
import * as config from './../config/api';

export interface ICourseService {
    getAllCourseList(): Promise<any[]>;
}

export class CourseService implements ICourseService {
    async getAllCourseList(): Promise<any> {
        try {
            const response = await axios.get(
                `${config.apiConfig.baseUrl}/v1/getAllCourseList`
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CourseService();
