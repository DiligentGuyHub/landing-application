import React, {useState, useEffect, useRef } from 'react';

export const AnswerElement = ({ answer, type, isSelected, handleAnswerSelect }) => {
    const answerRef = useRef(null);

    const handleOnChange = (answer) => (event) => {
        handleAnswerSelect(answer);
    };

    return (
        <div className='answer-wrapper'>
            <input
                type={type}
                name='option'
                className="answer-input"
                id={answer.value}
                value={answer.text}
                checked={isSelected}
                ref={answerRef}
                onChange={handleOnChange(answer)}/>
            <label className='answer-label' htmlFor={answer.value}>
                {answer.text}
            </label>
        </div>
    );
}