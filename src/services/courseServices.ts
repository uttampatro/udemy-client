import axios from './axios';
import * as config from './../config/api';
import { ContentDTO, ICourseContent, TopicDTO } from './dtos/dto';

export interface CreateCourseDTO {
    name: string;
    price: string;
    imageUrl: string;
    userId: string;
}

export interface CreateTopicDTO {
    name: string;
    sequence: number | null;
    userId: string;
    courseId: string;
}

export interface CreateContentDTO {
    title: string;
    sequence: number | null;
    data: ICourseContent;
    userId: string;
    topicId: string;
}

interface ICourseService {
    getAllCourseList(): Promise<any[]>;
    getAllTopicByCorseId(courseId: string): Promise<TopicDTO[]>;
    getAllContentByTopicId(topicId: string): Promise<ContentDTO[]>;
    getCourse(courseId: string): Promise<any[]>;
    createCourse(dto: CreateCourseDTO): Promise<any[]>;
    createTopic(dto: CreateTopicDTO): Promise<any[]>;
    createContent(dto: CreateContentDTO): Promise<any[]>;
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
    async createCourse(dto: CreateCourseDTO): Promise<any[]> {
        const { name, price, imageUrl, userId } = dto;
        const response = await axios.post(
            `${config.apiConfig.baseUrl}/v1/createCourse`,
            {
                name: name,
                price: price,
                imageUrl: imageUrl,
                userId: userId,
            }
        );
        if (response.data) {
            localStorage.setItem('createCourse', JSON.stringify(response.data));
        }
        return response.data;
    }
    async createTopic(dto: CreateTopicDTO): Promise<any[]> {
        const { sequence, name, userId, courseId } = dto;
        const response = await axios.post(
            `${config.apiConfig.baseUrl}/v1/createCourseTopic`,
            {
                sequence: sequence,
                name: name,
                userId: userId,
                courseId: courseId,
            }
        );
        return response.data;
    }
    async createContent(dto: CreateContentDTO): Promise<any[]> {
        const { sequence, title, data, userId, topicId } = dto;
        const response = await axios.post(
            `${config.apiConfig.baseUrl}/v1/createCourseContent`,
            {
                sequence: sequence,
                title: title,
                data: data,
                userId: userId,
                topicId: topicId,
            }
        );
        return response.data;
    }
}
