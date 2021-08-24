export interface UserDTO {
    id: string;
    username: string;
}

export interface CourseDTO {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    createdBy: UserDTO;
}

export interface TopicDTO {
    id: string;
    name: string;
    course: CourseDTO;
}

export interface ICourseContent {
    type: string;
    text: string;
    videoUrl: string;
    imageUrl: string;
}

export interface ContentDTO {
    content: ICourseContent[];
    topic: TopicDTO;
}
