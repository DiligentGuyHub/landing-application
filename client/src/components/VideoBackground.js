import react, {useState, useEffect} from 'react';
import React from "react";
import video from '../temp/chocolate-production.mp4';
import '../styles/VideoBackground.css';
export function VideoBackground ({isVisible}) {
    return (
        <div
             className={`video-container ${!isVisible ? "slide-up" : "slide-down"}`}>
            <video autoPlay muted loop>
                <source src={video} type="video/mp4" />
            </video>

            <div className="overlay"></div>
        </div>
    );
}