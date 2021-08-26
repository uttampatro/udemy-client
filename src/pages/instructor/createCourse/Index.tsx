import React, { useReducer, useState } from 'react';
import './style.css';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';
import {
    createCoursePageReducer,
    initialCreateCoursePage,
    useCreateCoursePageDispatchHook,
} from './store';
import { useEffect } from 'react';

function CourseCreate() {
    const User = localStorage.getItem('user');
    const user = User ? JSON.parse(User) : undefined;

    const Course = localStorage.getItem('createCourse');
    const course = Course ? JSON.parse(Course) : undefined;

    const [state, customDispatch] = useReducer(
        createCoursePageReducer,
        initialCreateCoursePage
    );

    const { name, price, imageUrl, error, isCreating } = state;
    const createCoursePageDispatch =
        useCreateCoursePageDispatchHook(customDispatch);
    const { setName, setImageUrl, setPrice, createCourse } =
        createCoursePageDispatch;

    const history = useHistory();

    useEffect(() => {
        if (error) {
            alert(JSON.stringify(error));
        }
    }, [error]);

    const goToBody = () => {
        try {
            history.push('/home');
        } catch (error) {
            console.log(error);
        }
    };

    const createCourseTopic = () => {
        try {
            history.push(`/createCourseTopic`);
        } catch (error) {
            console.log(error);
        }
    };

    const createCourseEntry = async () => {
        try {
            await createCourse({
                name: name,
                price: price,
                imageUrl: imageUrl,
                userId: user.id,
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="CreateCourse">
            <div className="CreateCourse_header">
                <div>
                    <a href="" className="logo">
                        <img
                            src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                            alt="Udemy"
                        />
                    </a>
                </div>
                <div className="CreateCourse_header2">
                    <div onClick={goToBody} className="CreateCourse_para">
                        <p>Student</p>
                    </div>
                    <div className="CreateCourse_icon">
                        <IconButton>
                            <NotificationsNoneOutlinedIcon />
                        </IconButton>
                    </div>
                    <div className="CreateCourse_icon">
                        <Avatar />
                    </div>
                </div>
            </div>
            <div className="CreateCourse_body">
                <div className="CreateCourse_body2">
                    <div className="CreateCourse_quote">
                        <p>Jump Into Course Creation</p>
                    </div>
                    <div className="CreateCourse_form">
                        <form onSubmit={createCourseTopic} action="">
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                placeholder="Name"
                                type="text"
                            />
                            <input
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                placeholder="ImageURL"
                                type="text"
                            />
                            <input
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                                placeholder="Price"
                                type="text"
                            />
                            <button type="submit" onClick={createCourseEntry}>
                                Create Your Course
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCreate;
