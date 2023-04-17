import React, {useState, useEffect} from "react";
import '../styles/BrandHeader.css'

export const BrandHeader = ({isScrolled}) => {
    return (
        <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
            <h1 className='header fixed-header'>Chocolique</h1>
        </div>
    );
}