import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {VideoBackground} from './components/VideoBackground'

function App() {
    // const [questions, setQuestions] = useState([])
    // useEffect(() => {
    //     fetch('http://localhost:4000/')
    //         .then(res => res.json())
    //         .then(data => setQuestions(data))
    // }, []);


    // const handleScroll = () => {
    //     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     const threshold = 50;
    //     if (scrollTop > threshold) {
    //         headerRef.current.classList.add('scrolled');
    //     } else {
    //         headerRef.current.classList.remove('scrolled');
    //     }
    // }

    return (
        <div className="container">
            <VideoBackground/>
        </div>);
}

export default App;
