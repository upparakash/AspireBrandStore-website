import React from "react";
import errorImg from "./assets/ErrorImg.png";
import Errorvideo from './assets/ErrorVideo.mp4';
import "./InvalidOrder.css";

const InvalidOrder = () => {
    return (
        <div className="error-container">
            <div className="error-box">


                <p className="error-text">Invalid Order ID</p>


                <video
                    src={Errorvideo}
                    autoPlay
                    loop
                    muted
                    className="error-video"
                ></video>

                <p className="sub-text">
                    The order ID you entered is invalid. Please check the email or
                    message you received and try again.
                </p>
            </div>
        </div>
    );
};

export default InvalidOrder;
