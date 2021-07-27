import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Index() {
    return (
        <div className="home">
            <Link to={'/courseDetails'} style={{ textDecoration: 'none' }}>
                <div className="home_body">
                    <div className="home_img">
                        <img
                            width="240"
                            height="135"
                            src="https://img-c.udemycdn.com/course/240x135/3124072_2957_8.jpg"
                            alt=""
                        />
                    </div>
                    <div className="home_description">
                        <p className="home_description_p">
                            The Python Mega Course: Build 10 Real World
                            Applications
                        </p>

                        <h3>uttam</h3>

                        <p>₹499</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Index;
