import { courseService } from '../../../services';
import { CreateTopicDTO } from '../../../services/courseServices';
import { TopicDTO } from '../../../services/dtos/dto';

export interface ICreateCourseTopicState {
    name: string;
    sequence: number | null;
    topics: TopicDTO[];
    error: string;
    isFetching: boolean;
    isCreating: boolean;
}

export const initialCreateCourseTopicPage: ICreateCourseTopicState = {
    name: '',
    sequence: null,
    topics: [],
    error: '',
    isFetching: true,
    isCreating: true,
};

export interface ReducerAction {
    type: string;
    payload: any;
}

export const createCourseTopicPageReducer = (
    state: ICreateCourseTopicState = initialCreateCourseTopicPage,
    action: ReducerAction
): ICreateCourseTopicState => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_SEQUENCE':
            return { ...state, sequence: action.payload };
        case 'CREATING_COURSE_TOPIC':
            return { ...state, isCreating: true };
        case 'CREATING_COURSE_TOPIC_SUCCESS':
            return { ...state, name: action.payload, isCreating: false };
        case 'CREATING_COURSE_TOPIC_FAILURE':
            return { ...state, error: action.payload, isCreating: false };
        case 'GETTING_ALL_TOPIC':
            return { ...state, isFetching: true };
        case 'GETTING_ALL_TOPIC_SUCCESS':
            return { ...state, topics: action.payload, isFetching: false };
        case 'GETTING_ALL_TOPIC_FAILURE':
            return { ...state, error: action.payload, isFetching: false };
        default:
            throw new Error('Invalid action');
    }
};

export const useCreateCourseTopicPageDispatchHook = (
    dispatch: (arg: any) => void
) => {
    const setName = (name: string) => {
        dispatch({
            type: 'SET_NAME',
            payload: name,
        });
    };
    const setSequence = (sequence: number | null) => {
        dispatch({
            type: 'SET_SEQUENCE',
            payload: sequence,
        });
    };
    const creatingCourseTopic = () => {
        dispatch({
            type: 'CREATING_COURSE_TOPIC',
        });
    };

    const creatingCourseTopicSuccess = () => {
        dispatch({
            type: 'CREATING_COURSE_TOPIC_SUCCESS',
        });
    };

    const creatingCourseTopicFailure = (error: string) => {
        dispatch({
            type: 'CREATING_COURSE_TOPIC_FAILURE',
            payload: error,
        });
    };

    const gettingAllTopic = () => {
        dispatch({
            type: 'GETTING_ALL_TOPIC',
        });
    };

    const gettingAllTopicSuccess = (topics: TopicDTO[]) => {
        dispatch({
            type: 'GETTING_ALL_TOPIC_SUCCESS',
            payload: topics,
        });
    };

    const gettingAllRTopicFailure = (error: string) => {
        dispatch({
            type: 'GETTING_ALL_TOPIC_FAILURE',
            payload: error,
        });
    };

    const createCourseTopic = async (dto: CreateTopicDTO) => {
        try {
            const { sequence, name, userId, courseId } = dto;
            creatingCourseTopic();
            await courseService.createTopic({
                name: name,
                sequence: sequence,
                userId: userId,
                courseId: courseId,
            });
            creatingCourseTopicSuccess();
        } catch (error) {
            creatingCourseTopicFailure(error);
        }
    };

    const fetchAllTopic = async (courseId: string) => {
        try {
            gettingAllTopic();
            const topics = await courseService.getAllTopicByCorseId(courseId);
            gettingAllTopicSuccess(topics);
        } catch (error) {
            gettingAllRTopicFailure(error);
        }
    };

    return {
        fetchAllTopic,
        createCourseTopic,
        setName,
        setSequence,
    };
};
