import '../styles/GratificationMessage.css'
// @ts-ignore
import labels from '../labels.json'
import React from "react";

export const GratificationMessage = () => {
    return (
        <div className="gratification-message">
            <h1>{labels["gratification-header"]}</h1>
            <p>{labels["gratification-message"]}</p>
        </div>);
}