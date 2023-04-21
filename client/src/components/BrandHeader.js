import '../styles/BrandHeader.css'
import labels from '../labels.json'

export const BrandHeader = ({isScrolled}) => {
    return (
        <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
            <h1 className='header fixed-header'>{labels['company-name']}</h1>
        </div>
    );
}