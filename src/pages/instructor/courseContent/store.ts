import { courseService } from '../../../services';
import { CreateContentDTO } from '../../../services/courseServices';
import {
    ContentDTO,
    CourseContentType,
    ICourseContent,
} from '../../../services/dtos/dto';

export interface ICreateCourseContentState {
    title: string;
    sequence: number | null;
    data: ICourseContent;
    contents: ContentDTO[];
    error: string;
    isCreating: boolean;
    isFetching: boolean;
}

export const initialCreateCourseContentPage: ICreateCourseContentState = {
    title: '',
    sequence: null,
    data: {
        type: CourseContentType.NONE,
        text: '',
        videoUrl: '',
        imageUrl: '',
    },
    contents: [],
    error: '',
    isCreating: true,
    isFetching: true,
};

export interface ReducerAction {
    type: string;
    payload: any;
}

export const createCourseContentPageReducer = (
    state: ICreateCourseContentState = initialCreateCourseContentPage,
    action: ReducerAction
): ICreateCourseContentState => {
    switch (action.type) {
        case 'SET_TYPE':
            return { ...state, data: { ...state.data, type: action.payload } };
        case 'SET_TEXT':
            return { ...state, data: { ...state.data, text: action.payload } };
        case 'SET_VIDEO_URL':
            return {
                ...state,
                data: { ...state.data, videoUrl: action.payload },
            };
        case 'SET_IMAGE_URL':
            return {
                ...state,
                data: { ...state.data, imageUrl: action.payload },
            };
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_SEQUENCE':
            return { ...state, sequence: action.payload };
        case 'CREATING_COURSE_CONTENT':
            return { ...state, isCreating: true };
        case 'CREATING_COURSE_CONTENT_SUCCESS':
            return {
                ...state,
                data: action.payload,
                isCreating: false,
            };
        case 'CREATING_COURSE_CONTENT_FAILURE':
            return { ...state, error: action.payload, isCreating: false };
        case 'GETTING_ALL_CONTENT':
            return { ...state, isFetching: true };
        case 'GETTING_ALL_CONTENT_SUCCESS':
            return { ...state, contents: action.payload, isFetching: false };
        case 'GETTING_ALL_CONTENT_FAILURE':
            return { ...state, error: action.payload, isFetching: false };
        default:
            throw new Error('Invalid action');
    }
};

export const useCreateCourseContentPageDispatchHook = (
    dispatch: (arg: any) => void
) => {
    const setType = (type: CourseContentType) => {
        dispatch({
            type: 'SET_TYPE',
            payload: type,
        });
    };
    const setText = (text: string) => {
        dispatch({
            type: 'SET_TEXT',
            payload: text,
        });
    };
    const setVideoUrl = (videoUrl: string) => {
        dispatch({
            type: 'SET_VIDEO_URL',
            payload: videoUrl,
        });
    };
    const setImageUrl = (imageUrl: string) => {
        dispatch({
            type: 'SET_IMAGE_URL',
            payload: imageUrl,
        });
    };
    const setTitle = (title: string) => {
        dispatch({
            type: 'SET_TITLE',
            payload: title,
        });
    };
    const setSequence = (sequence: number | null) => {
        dispatch({
            type: 'SET_SEQUENCE',
            payload: sequence,
        });
    };
    const creatingCourseContent = () => {
        dispatch({
            type: 'CREATING_COURSE_CONTENT',
        });
    };
    const creatingCourseContentSuccess = () => {
        dispatch({
            type: 'CREATING_COURSE_CONTENT_SUCCESS',
        });
    };
    const creatingCourseContentFailure = (error: string) => {
        dispatch({
            type: 'CREATING_COURSE_CONTENT_FAILURE',
            payload: error,
        });
    };

    const gettingAllContent = () => {
        dispatch({
            type: 'GETTING_ALL_CONTENT',
        });
    };

    const gettingAllContentSuccess = (contents: ContentDTO[]) => {
        dispatch({
            type: 'GETTING_ALL_CONTENT_SUCCESS',
            payload: contents,
        });
    };

    const gettingAllContentFailure = (error: string) => {
        dispatch({
            type: 'GETTING_ALL_CONTENT_FAILURE',
            payload: error,
        });
    };

    const createCourseContent = async (dto: CreateContentDTO) => {
        try {
            const { sequence, title, data, topicId, userId } = dto;
            const { type, text, imageUrl, videoUrl } = data;

            creatingCourseContent();
            await courseService.createContent({
                sequence: sequence,
                title: title,
                data: { type, text, imageUrl, videoUrl },
                topicId: topicId,
                userId: userId,
            });
            creatingCourseContentSuccess();
        } catch (error) {
            creatingCourseContentFailure(error);
        }
    };

    const fetchAllContent = async (topicId: string) => {
        try {
            gettingAllContent();
            const contents = await courseService.getAllContentByTopicId(
                topicId
            );
            gettingAllContentSuccess(contents);
        } catch (error) {
            gettingAllContentFailure(error);
        }
    };

    return {
        createCourseContent,
        setType,
        setText,
        setVideoUrl,
        setImageUrl,
        setTitle,
        setSequence,
        fetchAllContent,
    };
};
