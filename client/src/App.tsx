import './styles/App.css';
import React, {useState, useEffect} from 'react';
import {VideoBackground} from './components/VideoBackground';
import {QuestionForm} from './components/QuestionForm';
import {BrandHeader} from "./components/BrandHeader";
import {GratificationMessage} from "./components/GratificationMessage";
// @ts-ignore
import Cookies from 'js-cookie';

interface User {
    userId: string;
    name: string;
    email: string;
    age: string;
}


function App(): JSX.Element {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isQuizCompleted, setIsQuizCompleted] = useState(Cookies.get('userId'));

    const handleUserCookie = (user: User) => {
        Cookies.set('userId', user.userId);
        setIsQuizCompleted(true);
        console.log(`New cookie created: ${user.userId}`);
    }

    useEffect(() => {
        const handleScroll = () => {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                if (scrollTop > 0 && !isScrolled) {
                    setIsScrolled(true);
                }
                // } else if (scrollTop === 0 && isScrolled) {
                //     setIsScrolled(false);
                // }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolled]);

    return (
        <main>
            <div className='component-wrapper'>
                <BrandHeader isScrolled={isScrolled}/>
                <VideoBackground isVisible={!isScrolled}/>
                {isQuizCompleted
                    ? <GratificationMessage/>
                    : <QuestionForm isScrolled={isScrolled} handleUserCookie={handleUserCookie}/>
                }
            </div>
        </main>
    );
}

export default App;
