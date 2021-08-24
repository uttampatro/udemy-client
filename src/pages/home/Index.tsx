import React, { useEffect } from 'react';
import { useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    homePageReducer,
    initialHomePageState,
    useHomePageDispatchHook,
} from './store';
import './style.css';

function Index() {
    const [state, customDispatch] = useReducer(
        homePageReducer,
        initialHomePageState
    );
    const homePageDispatch = useHomePageDispatchHook(customDispatch);
    const { fetchAllCourse } = homePageDispatch;
    const { courses, isFetching, error } = state;

    useEffect(() => {
        fetchAllCourse();
    }, []);

    useEffect(() => {
        if (error) {
            alert('something went wrong');
        }
    }, [error]);

    if (isFetching) {
        return <>Loading....</>; // TODO: Put loader
    }
    return (
        <div className="home">
            {courses.map(course => {
                return (
                    <Link
                        to={`/courseDetails/${course.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="home_body">
                            <div className="home_img">
                                <img
                                    width="240"
                                    height="135"
                                    src={course.imageUrl}
                                    alt=""
                                />
                            </div>

                            <div className="home_description">
                                <p className="home_description_p">
                                    {course.name}
                                </p>

                                <h3> {course.createdBy.username}</h3>

                                <p> {course.price}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default Index;
