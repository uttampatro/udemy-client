import { Avatar, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@material-ui/core';
import './style.css';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

function Index() {
    const [showDialog, setShowDialog] = useState(false);

    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);

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
                        <div>
                            {closeDialog ? (
                                <IconButton
                                    aria-label="close"
                                    className="closeButton"
                                    onClick={closeDialog}
                                >
                                    <CloseIcon className="closeButton" />
                                </IconButton>
                            ) : null}
                        </div>
                        <form onSubmit={closeDialog} action="">
                            <DialogContent dividers>
                                <Box width="300px" height="150px">
                                    <DialogContentText>
                                        <h1 className="dialogContent_p">
                                            Topic
                                        </h1>
                                        {/* <div className="dialogContent"> */}
                                        <div className="input">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Name"
                                            />
                                        </div>
                                        {/* </div> */}
                                    </DialogContentText>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <button type="submit" className="CourseButton">
                                    Create
                                </button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </div>
            </div>
            <div>
                <div className="CourseTopic_feed">
                    <Link
                        to={'/createCourseContent'}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="CourseTopic_feed_body">
                            <div className="CourseTopic_feed_h">
                                <h2>1</h2>
                            </div>
                            <div className="CourseTopic_feed_description">
                                <p className="CourseTopic_description_p">
                                    The Python Mega Course: Build 10 Real World
                                    Applications
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Index;
