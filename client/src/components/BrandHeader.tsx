import '../styles/BrandHeader.css'
import React from "react";
// @ts-ignore
import labels from '../labels.json'

interface BrandHeaderProps {
    isScrolled: boolean
}
export const BrandHeader = ({isScrolled} : BrandHeaderProps) => {
    return (
        <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
            <h1 className='header fixed-header'>{labels['company-name']}</h1>
        </div>
    );
}