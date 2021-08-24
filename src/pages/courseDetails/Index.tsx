import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
    IconButton,
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@material-ui/core';
import './style.css';
import CloseIcon from '@material-ui/icons/Close';
import { useReducer } from 'react';
import {
    courseDetailsPageReducer,
    initialCourseDetailsPage,
    useCourseDetailsPageDispatchHook,
} from './store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Index() {
    const [state, customDispatch] = useReducer(
        courseDetailsPageReducer,
        initialCourseDetailsPage
    );
    const courseDetailsPageDispatch =
        useCourseDetailsPageDispatchHook(customDispatch);
    const { fetchCourse, fetchAllTopic, fetchAllContent } =
        courseDetailsPageDispatch;
    const { course, topics, contents, error, isFetching } = state;

    const { courseId }: any = useParams();

    useEffect(() => {
        fetchAllTopic(courseId);
        fetchCourse(courseId);
    }, []);

    useEffect(() => {
        if (error) {
            alert('something went wrong');
        }
    }, [error]);

    const [showDialog, setShowDialog] = useState(false);

    const openDialog = () => {
        setShowDialog(true);
    };

    const fetchContentList = (topicId: string) => {
        openDialog();
        fetchAllContent(topicId);
    };

    const closeDialog = () => setShowDialog(false);
    const history = useHistory();

    const goToCheckout = () => {
        try {
            history.push('/checkout');
        } catch (error) {
            console.log(error);
        }
    };

    if (isFetching) {
        return <>Loading....</>; // TODO: Put loader
    }
    return (
        <div className="courseDetails">
            <div className="courseDetails_header">
                <div className="courseDetails_head1">
                    <h1>{course.name}</h1>
                    <p>
                        Created By{' '}
                        <span>
                            <a href="">{course.createdBy?.username}</a>{' '}
                        </span>
                    </p>
                    <div className="courseDetails_button">
                        <button>Wishlist</button>
                        <button>Share</button>
                        <button>Gift This course</button>
                    </div>
                </div>
                <div className="courseDetails_imgBody">
                    <img
                        width="300"
                        height="150"
                        src={course.imageUrl}
                        alt=""
                    />
                    <i className="stop circle outline icon"></i>
                    <div>
                        <h2>₹{course.price}</h2>
                    </div>
                    <div className="courseDetails_button1">
                        <button className="courseDetails_button2">
                            Add to cart
                        </button>
                        <button onClick={goToCheckout} className="courseButton">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            <h1>Course topic</h1>
            {topics.map(topic => {
                return (
                    <div
                        onClick={() => fetchContentList(topic.id)}
                        className="courseDetails_body"
                    >
                        <div className="courseDetails_feed_h">
                            <h2>1</h2>
                        </div>
                        <div className="courseDetails_feed_description">
                            <p className="courseDetails_description_p">
                                {topic.name}
                            </p>
                        </div>
                    </div>
                );
            })}

            <div className="courseDetails_des">
                <Dialog open={showDialog}>
                    <div className="courseDetails_closeButton">
                        {closeDialog ? (
                            <IconButton
                                aria-label="close"
                                className="closeButton"
                                onClick={closeDialog}
                            >
                                <CloseIcon />
                            </IconButton>
                        ) : null}
                        <h3>Course content</h3>
                    </div>
                    <DialogContent dividers>
                        <Box width="100vw">
                            <DialogContentText>
                                {contents.map(content => {
                                    return (
                                        <div className="CourseDetailContent_feed_body">
                                            <div className="CourseDetailContent_feed_h">
                                                <h2>1</h2>
                                            </div>
                                            <div className="CourseDetailContent_feed_description">
                                                <p className="CourseDetailContent_description_p">
                                                    {content.content}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </DialogContentText>
                        </Box>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default Index;
