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
import { useHistory } from 'react-router';
import {
    createCourseContentPageReducer,
    initialCreateCourseContentPage,
    useCreateCourseContentPageDispatchHook,
} from './store';
import { CourseContentType } from '../../../services/dtos/dto';
import { useParams } from 'react-router-dom';

function CourseContent() {
    const User = localStorage.getItem('user');
    const user = User ? JSON.parse(User) : undefined;

    const [state, customDispatch] = useReducer(
        createCourseContentPageReducer,
        initialCreateCourseContentPage
    );
    const {
        sequence,
        title,
        data: { text, type, imageUrl, videoUrl },
        contents,
        error,
        isFetching,
        isCreating,
    } = state;

    const createCourseContentPageDispatch =
        useCreateCourseContentPageDispatchHook(customDispatch);

    const {
        createCourseContent,
        setType,
        setText,
        setVideoUrl,
        setImageUrl,
        setTitle,
        setSequence,
        fetchAllContent,
    } = createCourseContentPageDispatch;

    const { topicId }: any = useParams();

    useEffect(() => {
        fetchAllContent(topicId);
    }, []);

    useEffect(() => {
        if (error) {
            alert('something went wrong');
        }
    }, [error]);

    const createCourseContentEntry = async () => {
        try {
            await createCourseContent({
                title: title,
                data: { type, text, imageUrl, videoUrl },
                sequence: sequence,
                userId: user.id,
                topicId: topicId,
            });
        } catch (e) {
            console.log(e);
        }
    };

    const [showDialog, setShowDialog] = useState(false);

    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);
    const history = useHistory();

    useEffect(() => {
        if (error) {
            alert(JSON.stringify(error));
        }
    }, [error]);

    const goToCourse = () => {
        try {
            history.push('/createCourse');
        } catch (error) {
            console.log(error);
        }
    };

    if (isFetching) {
        return <>Loading....</>; // TODO: Put loader
    }

    return (
        <div className="CourseContent">
            <div className="CourseContent_header">
                <div>
                    <a href="" className="logo">
                        <img
                            src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                            alt="Udemy"
                        />
                    </a>
                </div>
                <div className="CourseContent_header2">
                    <button onClick={openDialog}>Create Content</button>
                    <button onClick={goToCourse}>Submit</button>
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
                            <h2 className="dialogContent_p">Content</h2>
                        </div>
                        <form onSubmit={closeDialog} action="">
                            <DialogContent dividers>
                                <Box width="500px" height="300px">
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
                                            <label>Title</label>
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={e =>
                                                    setTitle(e.target.value)
                                                }
                                                required
                                                placeholder="Title"
                                            />
                                        </div>
                                        <div className="input">
                                            <label>Type</label>
                                            <input
                                                type="number"
                                                value={type}
                                                onChange={e =>
                                                    setType(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                required
                                                placeholder="type"
                                            />
                                        </div>
                                        <div className="input">
                                            <label>Text</label>
                                            <input
                                                type="text"
                                                value={text}
                                                onChange={e =>
                                                    setText(e.target.value)
                                                }
                                                placeholder="text"
                                            />
                                        </div>
                                        <div className="input">
                                            <label>ImageUrl</label>
                                            <input
                                                type="text"
                                                value={imageUrl}
                                                onChange={e =>
                                                    setImageUrl(e.target.value)
                                                }
                                                placeholder="imageUrl"
                                            />
                                        </div>
                                        <div className="input">
                                            <label>VideoUrl</label>
                                            <input
                                                type="text"
                                                value={videoUrl}
                                                onChange={e =>
                                                    setVideoUrl(e.target.value)
                                                }
                                                placeholder="videoUrl"
                                            />
                                        </div>{' '}
                                    </DialogContentText>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <button
                                    onClick={() => createCourseContentEntry()}
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
            <div className="CourseContent_feed">
                {contents.map(content => {
                    return (
                        <div className="CourseContent_feed_body">
                            <div className="CourseContent_feed_h">
                                <h2>{content.sequence}</h2>
                            </div>
                            <div className="CourseContent_feed_description">
                                <p className="CourseContent_description_p">
                                    {content.title}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CourseContent;
