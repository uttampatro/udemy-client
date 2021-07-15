import React from 'react';
import './BodyFeed.css';

function BodyFeed() {
    return (
        <div className="BodyFeed">
            <div className="BodyFeed-header">
                <div className="BodyFeed_img">
                    <img
                        src="https://img-c.udemycdn.com/notices/web_banner/image_udlite/dc2bc81a-a342-474d-9d09-0ba3c2bfa687.jpg"
                        alt=""
                    />
                </div>
                <div className="BodyFeed_description">
                    <h1>
                        A new brand,
                        <br />a renewed purpose
                    </h1>
                    <p>
                        We're still changing learning for the better — now we
                        just look better doing it
                    </p>
                </div>
            </div>

            <div className="BodyFeed_body">
                <div className="BodyFeed_heading">
                    <h2 className="h2">Let's start learning, ...</h2>
                    <div className="p">
                        <a href="">
                            <span>My learning</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="BodyFeed_myVideos">
                <div className="BodyFeed_myVideos_container">
                    <div className="first_video">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyFeed;
