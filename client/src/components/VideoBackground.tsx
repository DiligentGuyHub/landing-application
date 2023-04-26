import React from "react";
// @ts-ignore
import video from '../temp/chocolate-production.mp4';
import '../styles/VideoBackground.css';

interface VideoProps {
    isVisible: boolean;
}

export const VideoBackground = ({isVisible}: VideoProps) => {
    return (
        <div
            className={`video-container ${!isVisible ? "slide-up" : "slide-down"}`}>
            <video autoPlay muted loop>
                <source src={video} type="video/mp4"/>
                {/*<source src='https://drive.google.com/file/d/191Pp0pD1gfO_5KTIkXL1csq_A2x6euHr/view?usp=share_link' type="video/mp4" />*/}
            </video>
            <div className="overlay"></div>
        </div>
    );
}