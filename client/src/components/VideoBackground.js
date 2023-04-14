import react, {useState, useEffect} from 'react';
import React from "react";
import video from '../temp/chocolate-production.mp4';

export function VideoBackground () {
    // const [video, setVideo] = useState(null);
    //
    // useEffect(() => {
    //     if (video) {
    //         video.play();
    //     }
    // }, [video]);

    return (
        <div className="video-container">
            <video autoPlay muted loop>
                <source src={video} type="video/mp4" />
            </video>
            <div className="header">
                <h1>Kommunarka Experience</h1>
            </div>
            <div className="overlay"></div>
        </div>
    );
}