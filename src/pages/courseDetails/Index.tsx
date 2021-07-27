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

function Index() {
    const [showDialog, setShowDialog] = useState(false);

    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);
    const history = useHistory();

    const goToCheckout = () => {
        try {
            history.push('/checkout');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="courseDetails">
            <div className="courseDetails_header">
                <div className="courseDetails_head1">
                    <h1>
                        React Certification Training (beginner to expert level)
                        2021
                    </h1>
                    <p>
                        Created By{' '}
                        <span>
                            <a href="">Uttam</a>{' '}
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
                        src="https://img-c.udemycdn.com/course/240x135/3124072_2957_8.jpg"
                        alt=""
                    />
                    <i className="stop circle outline icon"></i>
                    <div>
                        <h2>₹490</h2>
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
            <div className="courseDetails_des">
                <h1>Course topic</h1>
                <div onClick={openDialog} className="courseDetails_body">
                    <div className="courseDetails_feed_h">
                        <h2>1</h2>
                    </div>
                    <div className="courseDetails_feed_description">
                        <p className="courseDetails_description_p">
                            The Python Mega Course: Build 10 Real World
                            Applications
                        </p>
                    </div>
                </div>
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
                        <Box width="600px">
                            <DialogContentText>
                                <div className="CourseDetailContent_feed_body">
                                    <div className="CourseDetailContent_feed_h">
                                        <h2>1</h2>
                                    </div>
                                    <div className="CourseDetailContent_feed_description">
                                        <p className="CourseDetailContent_description_p">
                                            The Python Mega Course: Build 10
                                            Real World Applications
                                        </p>
                                    </div>
                                </div>
                            </DialogContentText>
                        </Box>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default Index;
