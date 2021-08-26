import { courseService } from '../../../services';
import { CreateCourseDTO } from '../../../services/courseServices';

export interface ICreateCourseState {
    name: string;
    price: string;
    imageUrl: string;
    error: string;
    isCreating: boolean;
}

export const initialCreateCoursePage: ICreateCourseState = {
    name: '',
    price: '',
    imageUrl: '',
    error: '',
    isCreating: true,
};

export interface ReducerAction {
    type: string;
    payload: any;
}

export const createCoursePageReducer = (
    state: ICreateCourseState = initialCreateCoursePage,
    action: ReducerAction
): ICreateCourseState => {
    switch (action.type) {
        case 'UPDATE_STATE':
            return { ...state, ...action.payload };
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_PRICE':
            return { ...state, price: action.payload };
        case 'SET_IMAGE_URL':
            return { ...state, imageUrl: action.payload };
        case 'CREATING_COURSE':
            return { ...state, isCreating: true };
        case 'CREATING_COURSE_SUCCESS':
            return {
                ...state,
                name: action.payload,
                price: action.payload,
                imageUrl: action.payload,
                isCreating: false,
            };
        case 'CREATING_COURSE_FAILURE':
            return { ...state, error: action.payload, isCreating: false };
        default:
            throw new Error('Invalid action');
    }
};

export const useCreateCoursePageDispatchHook = (
    dispatch: (arg: any) => void
) => {
    const setName = (name: string) => {
        dispatch({
            type: 'SET_NAME',
            payload: name,
        });
    };
    const setPrice = (price: string) => {
        dispatch({
            type: 'SET_PRICE',
            payload: price,
        });
    };
    const setImageUrl = (imageUrl: string) => {
        dispatch({
            type: 'SET_IMAGE_URL',
            payload: imageUrl,
        });
    };
    const updateState = (payload: any) => {
        dispatch({
            type: 'UPDATE_STATE',
            payload,
        });
    };
    const creatingCourse = () => {
        dispatch({
            type: 'CREATING_COURSE',
        });
    };
    const creatingCourseSuccess = () => {
        dispatch({
            type: 'CREATING_COURSE_SUCCESS',
        });
    };
    const creatingCourseFailure = (error: string) => {
        dispatch({
            type: 'CREATING_COURSE_FAILURE',
            payload: error,
        });
    };

    const createCourse = async (dto: CreateCourseDTO) => {
        try {
            const { name, price, imageUrl, userId } = dto;
            creatingCourse();
            await courseService.createCourse({
                name: name,
                price: price,
                imageUrl: imageUrl,
                userId: userId,
            });
            creatingCourseSuccess();
        } catch (error) {
            creatingCourseFailure(error);
        }
    };
    return {
        createCourse,
        setName,
        setPrice,
        setImageUrl,
        updateState,
    };
};
