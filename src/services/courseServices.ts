import axios from './axios';
import * as config from './../config/api';
import { ContentDTO, TopicDTO } from './dtos/dto';

interface ICourseService {
    getAllCourseList(): Promise<any[]>;
    getAllTopicByCorseId(courseId: string): Promise<TopicDTO[]>;
    getAllContentByTopicId(topicId: string): Promise<ContentDTO[]>;
    getCourse(courseId: string): Promise<any[]>;
}

export class CourseService implements ICourseService {
    async getAllCourseList(): Promise<any> {
        const response = await axios.get(
            `${config.apiConfig.baseUrl}/v1/getAllCourseList`
        );
        return response.data;
    }
    async getAllTopicByCorseId(courseId: string): Promise<TopicDTO[]> {
        const response = await axios.get(
            `${config.apiConfig.baseUrl}/v1/getTopicList/${courseId}`
        );
        return response.data;
    }
    async getAllContentByTopicId(topicId: string): Promise<ContentDTO[]> {
        const response = await axios.get(
            `${config.apiConfig.baseUrl}/v1/getContentList/${topicId}`
        );
        return response.data;
    }
    async getCourse(courseId: string): Promise<any> {
        const response = await axios.get(
            `${config.apiConfig.baseUrl}/v1/getCourse/${courseId}`
        );
        return response.data;
    }
}
