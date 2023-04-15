import logo from './logo.svg';
import './styles/App.css';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {VideoBackground} from './components/VideoBackground';
import {QuestionForm} from './components/QuestionForm';
import {BrandHeader} from "./components/BrandHeader";

function App() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 0 && !isScrolled) {
                setIsScrolled(true);
            } else if (scrollTop === 0 && isScrolled) {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolled]);

    return (
        <main>
            <div style={{position: 'relative'}}>
                <BrandHeader isScrolled={isScrolled}/>
                <VideoBackground isVisible={!isScrolled}/>
                <QuestionForm isScrolled={isScrolled} />
            </div>
        </main>

    );
}

export default App;
