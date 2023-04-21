import './styles/App.css';
import React, {useState, useEffect} from 'react';
import {VideoBackground} from './components/VideoBackground';
import {QuestionForm} from './components/QuestionForm';
import {BrandHeader} from "./components/BrandHeader";
import {GratificationMessage} from "./components/GratificationMessage";
import Cookies from 'js-cookie';
function App() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [userId, setUserId] = useState('');
    const [isQuizCompleted, setIsQuizCompleted] = useState(Cookies.get('userId'));

    useEffect(() => {
        if (Cookies.get('userId')) {
            setUserId(Cookies.get('userId'));
        }
        else {
            setUserId('');
        }
    }, [isQuizCompleted]);
    const handleUserCookie = (user) => {
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
