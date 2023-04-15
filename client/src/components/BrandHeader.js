import React, {useState, useEffect} from "react";

export const BrandHeader = ({isScrolled}) => {
    return (
        <div className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <h1>Kommunarka Experience</h1>
        </div>
    );
}