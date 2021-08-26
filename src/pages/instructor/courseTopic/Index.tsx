import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useReducer, useState } from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@material-ui/core';
import './style.css';
import CloseIcon from '@material-ui/icons/Close';
import { Link, useParams } from 'react-router-dom';
import {
    createCourseTopicPageReducer,
    initialCreateCourseTopicPage,
    useCreateCourseTopicPageDispatchHook,
} from './store';

function Index() {
    const [showDialog, setShowDialog] = useState(false);

    const User = localStorage.getItem('user');
    const user = User ? JSON.parse(User) : undefined;

    const Course = localStorage.getItem('createCourse');
    const course = Course ? JSON.parse(Course) : undefined;

    const [state, customDispatch] = useReducer(
        createCourseTopicPageReducer,
        initialCreateCourseTopicPage
    );
    const { sequence, name, topics, error, isFetching, isCreating } = state;

    const createCourseTopicPageDispatch =
        useCreateCourseTopicPageDispatchHook(customDispatch);
    const { fetchAllTopic, createCourseTopic, setName, setSequence } =
        createCourseTopicPageDispatch;

    const { courseId }: any = useParams();

    useEffect(() => {
        fetchAllTopic(course.id);
    }, []);

    const createCourseTopicEntry = async () => {
        try {
            await createCourseTopic({
                name: name,
                sequence: sequence,
                userId: user.id,
                courseId: course.id,
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (error) {
            alert(JSON.stringify(error));
        }
    }, [error]);

    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);

    if (isFetching) {
        return <>Loading....</>; // TODO: Put loader
    }

    return (
        <div className="CourseTopic">
            <div className="CourseTopic_header">
                <div>
                    <a href="" className="logo">
                        <img
                            src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                            alt="Udemy"
                        />
                    </a>
                </div>
                <div className="CourseTopic_header2">
                    <button onClick={openDialog}>Create Topic</button>
                    <Dialog open={showDialog}>
                        <div className="courseDetails_closeButton">
                            {closeDialog ? (
                                <IconButton
                                    aria-label="close"
                                    className="closeButton"
                                    onClick={closeDialog}
                                >
                                    <CloseIcon className="closeButton" />
                                </IconButton>
                            ) : null}
                            <h2 className="dialogContent_p">Topic</h2>
                        </div>
                        <form onSubmit={closeDialog} action="">
                            <DialogContent dividers>
                                <Box width="500px" height="200px">
                                    <DialogContentText>
                                        <div className="input">
                                            <label>Sequence No:</label>
                                            <input
                                                type="number"
                                                onChange={e =>
                                                    setSequence(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                required
                                                placeholder="Sequence"
                                            />
                                        </div>
                                        <div className="input">
                                            <label>Name:</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={e =>
                                                    setName(e.target.value)
                                                }
                                                required
                                                placeholder="Name"
                                            />
                                        </div>
                                    </DialogContentText>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <button
                                    onClick={() => createCourseTopicEntry()}
                                    type="submit"
                                    className="CourseButton"
                                >
                                    Create
                                </button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </div>
            </div>
            <div>
                <div className="CourseTopic_feed">
                    {topics.map(topic => {
                        return (
                            <Link
                                to={`/createCourseContent/${topic.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="CourseTopic_feed_body">
                                    <div className="CourseTopic_feed_h">
                                        <h2>{topic.sequence}</h2>
                                    </div>
                                    <div className="CourseTopic_feed_description">
                                        <p className="CourseTopic_description_p">
                                            {topic.name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Index;
