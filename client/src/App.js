import logo from './logo.svg';
import './styles/App.css';
import React, {useState, useEffect, useRef} from 'react';
import {VideoBackground} from './components/VideoBackground';
import {QuestionForm} from './components/QuestionForm';
import {BrandHeader} from "./components/BrandHeader";

function App() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                if (scrollTop > 0 && !isScrolled) {
                    setIsScrolled(true);
                } else if (scrollTop === 0 && isScrolled) {
                    setIsScrolled(false);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolled]);

    return (
        <main>
            <div style={{position: 'relative', overflow: 'hidden'}}>
                <BrandHeader isScrolled={isScrolled}/>
                <VideoBackground isVisible={!isScrolled}/>
                <QuestionForm isScrolled={isScrolled} />
            </div>
        </main>

    );
}

export default App;
