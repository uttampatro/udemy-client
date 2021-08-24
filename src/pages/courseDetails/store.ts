import { courseService } from '../../services';
import { ContentDTO, CourseDTO, TopicDTO } from '../../services/dtos/dto';

export interface ICourseDetailsState {
    course: CourseDTO;
    topics: TopicDTO[];
    contents: ContentDTO[];
    error: string;
    isFetching: boolean;
}

export const initialCourseDetailsPage: ICourseDetailsState = {
    course: {
        id: '',
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        createdBy: {
            id: '',
            username: '',
        },
    },
    topics: [],
    contents: [],
    error: '',
    isFetching: true,
};

export interface ReducerAction {
    type: string;
    payload: any;
}

export const courseDetailsPageReducer = (
    state: ICourseDetailsState = initialCourseDetailsPage,
    action: ReducerAction
): ICourseDetailsState => {
    switch (action.type) {
        case 'GETTING_COURSE':
            return { ...state, isFetching: true };
        case 'GETTING_COURSE_SUCCESS':
            return { ...state, course: action.payload, isFetching: false };
        case 'GETTING_COURSE_FAILURE':
            return { ...state, error: action.payload, isFetching: false };
        case 'GETTING_ALL_TOPIC':
            return { ...state, isFetching: true };
        case 'GETTING_ALL_TOPIC_SUCCESS':
            return { ...state, topics: action.payload, isFetching: false };
        case 'GETTING_ALL_TOPIC_FAILURE':
            return { ...state, error: action.payload, isFetching: false };
        case 'GETTING_ALL_CONTENT':
            return { ...state, isFetching: true };
        case 'GETING_ALL_CONTENT_SUCCESS':
            return { ...state, contents: action.payload, isFetching: false };
        case 'GETING_ALL_CONTENT_FAILURE':
            return { ...state, error: action.payload, isFetching: false };
        default:
            throw new Error('Invalid action');
    }
};

export const useCourseDetailsPageDispatchHook = (
    dispatch: (arg: any) => void
) => {
    const gettingCourse = () => {
        dispatch({
            type: 'GETTING_COURSE',
        });
    };

    const gettingCourseSuccess = (course: CourseDTO[]) => {
        dispatch({
            type: 'GETTING_COURSE_SUCCESS',
            payload: course,
        });
    };

    const gettingCourseFailure = (error: string) => {
        dispatch({
            type: 'GETTING_COURSE_FAILURE',
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

    const fetchCourse = async (courseId: string) => {
        try {
            gettingCourse();
            const course = await courseService.getCourse(courseId);
            gettingCourseSuccess(course);
        } catch (error) {
            gettingCourseFailure(error);
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

    return { fetchCourse, fetchAllTopic, fetchAllContent };
};
