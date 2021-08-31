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
import ReactPlayer from 'react-player';
import { CourseContentType } from '../../services/dtos/dto';

function CourseDetails() {
    const [state, customDispatch] = useReducer(
        courseDetailsPageReducer,
        initialCourseDetailsPage
    );
    const courseDetailsPageDispatch =
        useCourseDetailsPageDispatchHook(customDispatch);
    const { fetchCourse, fetchAllTopic, fetchAllContent } =
        courseDetailsPageDispatch;
    const { course, topics, contents, error, isFetching, isContentFetching } =
        state;

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

    const [showTextDialog, setShowTextDialog] = useState(false);
    const openTextDialog = () => setShowTextDialog(true);
    const closeTextDialog = () => setShowTextDialog(false);

    const [showImageDialog, setShowImageDialog] = useState(false);
    const openImageDialog = () => setShowImageDialog(true);
    const closeImageDialog = () => setShowImageDialog(false);

    const [showVideoDialog, setShowVideoDialog] = useState(false);
    const openVideoDialog = () => setShowVideoDialog(true);
    const closeVideoDialog = () => setShowVideoDialog(false);

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
                            <h2>{topic.sequence}</h2>
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
                        <Box width="550px">
                            {isContentFetching === true ? (
                                <>Loading...</>
                            ) : (
                                <DialogContentText>
                                    {contents.map(content => {
                                        return (
                                            <div className="CourseDetailContent_feed_body">
                                                <div className="CourseDetailContent_feed_h">
                                                    <h2>{content.sequence}</h2>
                                                </div>
                                                <div className="CourseDetailContent_feed_description">
                                                    <p className="CourseDetailContent_description_p">
                                                        <>
                                                            {content.data
                                                                .type ===
                                                            CourseContentType.TEXT ? (
                                                                <>
                                                                    <h3
                                                                        onClick={
                                                                            openTextDialog
                                                                        }
                                                                    >
                                                                        {
                                                                            content.title
                                                                        }
                                                                    </h3>
                                                                    <Dialog
                                                                        open={
                                                                            showTextDialog
                                                                        }
                                                                    >
                                                                        <div className="courseDetails_closeButton">
                                                                            {closeTextDialog ? (
                                                                                <IconButton
                                                                                    aria-label="close"
                                                                                    className="closeButton"
                                                                                    onClick={
                                                                                        closeTextDialog
                                                                                    }
                                                                                >
                                                                                    <CloseIcon />
                                                                                </IconButton>
                                                                            ) : null}
                                                                            <h3>
                                                                                {
                                                                                    content.title
                                                                                }
                                                                            </h3>
                                                                        </div>
                                                                        <DialogContent
                                                                            dividers
                                                                        >
                                                                            <Box>
                                                                                <DialogContentText className="courseDetails_Content_Data_p">
                                                                                    <p
                                                                                        style={{
                                                                                            width: '550px',
                                                                                            height: '600px',
                                                                                            fontSize:
                                                                                                'medium',
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            content
                                                                                                .data
                                                                                                .text
                                                                                        }
                                                                                    </p>
                                                                                </DialogContentText>
                                                                            </Box>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            {content.data
                                                                .type ===
                                                            CourseContentType.IMAGE ? (
                                                                <>
                                                                    <p
                                                                        onClick={
                                                                            openImageDialog
                                                                        }
                                                                    >
                                                                        {
                                                                            content.title
                                                                        }
                                                                    </p>

                                                                    <Dialog
                                                                        open={
                                                                            showImageDialog
                                                                        }
                                                                    >
                                                                        <div className="courseDetails_closeButton">
                                                                            {closeImageDialog ? (
                                                                                <IconButton
                                                                                    aria-label="close"
                                                                                    className="closeButton"
                                                                                    onClick={
                                                                                        closeImageDialog
                                                                                    }
                                                                                >
                                                                                    <CloseIcon />
                                                                                </IconButton>
                                                                            ) : null}
                                                                            <h3>
                                                                                {
                                                                                    content.title
                                                                                }
                                                                            </h3>
                                                                        </div>
                                                                        <DialogContent
                                                                            dividers
                                                                        >
                                                                            <Box>
                                                                                <DialogContentText>
                                                                                    <img
                                                                                        width="550px"
                                                                                        height="300px"
                                                                                        src={
                                                                                            content
                                                                                                .data
                                                                                                .imageUrl
                                                                                        }
                                                                                        alt=""
                                                                                    />
                                                                                </DialogContentText>
                                                                            </Box>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            {content.data
                                                                .type ===
                                                            CourseContentType.VIDEO ? (
                                                                <>
                                                                    <p
                                                                        onClick={
                                                                            openVideoDialog
                                                                        }
                                                                    >
                                                                        {
                                                                            content.title
                                                                        }
                                                                    </p>

                                                                    <Dialog
                                                                        open={
                                                                            showVideoDialog
                                                                        }
                                                                    >
                                                                        <div className="courseDetails_closeButton">
                                                                            {closeVideoDialog ? (
                                                                                <IconButton
                                                                                    aria-label="close"
                                                                                    className="closeButton"
                                                                                    onClick={
                                                                                        closeVideoDialog
                                                                                    }
                                                                                >
                                                                                    <CloseIcon />
                                                                                </IconButton>
                                                                            ) : null}
                                                                            <h3>
                                                                                {
                                                                                    content.title
                                                                                }
                                                                            </h3>
                                                                        </div>
                                                                        <DialogContent
                                                                            dividers
                                                                        >
                                                                            <Box>
                                                                                <DialogContentText>
                                                                                    <ReactPlayer
                                                                                        width="550px"
                                                                                        height="300px"
                                                                                        controls
                                                                                        type="video/*"
                                                                                        url={
                                                                                            content
                                                                                                .data
                                                                                                .videoUrl
                                                                                        }
                                                                                    />
                                                                                </DialogContentText>
                                                                            </Box>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </>
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </DialogContentText>
                            )}
                        </Box>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default CourseDetails;
