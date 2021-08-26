import { courseService } from '../../services';
import { CourseDTO } from '../../services/dtos/dto';

export interface IHomeState {
    courses: CourseDTO[];
    error: string;
    isFetching: boolean;
}

export const initialHomePageState: IHomeState = {
    courses: [],
    error: '',
    isFetching: true,
};

export interface ReducerAction {
    type: string;
    payload: any;
}

export const homePageReducer = (
    state: IHomeState = initialHomePageState,
    action: ReducerAction
): IHomeState => {
    switch (action.type) {
        case 'GETTING_ALL_COURSE':
            return { ...state, isFetching: true };
        case 'GETTING_ALL_COURSE_SUCCESS':
            return { ...state, courses: action.payload, isFetching: false };
        case 'GETtING_ALL_COURSE_FAILURE':
            return { ...state, error: action.payload, isFetching: false };
        default:
            throw new Error('Invalid action');
    }
};

export const useHomePageDispatchHook = (dispatch: (arg: any) => void) => {
    const gettingAllCourse = () => {
        dispatch({
            type: 'GETTING_ALL_COURSE',
        });
    };

    const gettingAllCourseSuccess = (courses: CourseDTO[]) => {
        dispatch({
            type: 'GETTING_ALL_COURSE_SUCCESS',
            payload: courses,
        });
    };

    const gettingAllCourseFailure = (error: string) => {
        dispatch({
            type: 'GETTING_ALL_COURSE_FAILURE',
            payload: error,
        });
    };

    const fetchAllCourse = async () => {
        try {
            gettingAllCourse();
            const courses = await courseService.getAllCourseList();
            gettingAllCourseSuccess(courses);
        } catch (e) {
            gettingAllCourseFailure(e);
        }
    };

    return { fetchAllCourse };
};
