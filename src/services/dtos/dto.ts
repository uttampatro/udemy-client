export interface UserDTO {
    id: string;
    username: string;
}

export interface CourseDTO {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    createdBy: UserDTO;
}

export interface TopicDTO {
    id: string;
    sequence: number;
    name: string;
    course: CourseDTO;
}

export enum CourseContentType {
    TEXT = 1,
    IMAGE = 2,
    VIDEO = 3,
    NONE = 0,
}

export interface ICourseContent {
    type: CourseContentType;
    text: string;
    videoUrl: string;
    imageUrl: string;
}

export interface ContentDTO {
    title: string;
    sequence: number;
    data: ICourseContent;
    topic: TopicDTO;
}
