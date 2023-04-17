import React, {useState, useEffect} from "react";
import '../styles/TextElement.css'

export const TextElement = ({prompt, regex, onBlur, onChange}) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const validatorString = /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+$/
    const validator = new RegExp(validatorString);

    const handleChange = (event) => {
        const newInput = event.target.value;
        setInput(newInput);
        onChange(newInput);
    }

    const handleBlur = (event) => {
        validator.test(input) ? setError('') : setError('Error');
        console.log(validator.test(input));
        onBlur && onBlur(event);
    }
    return (
        <div className='text-wrapper'>
            <label htmlFor={prompt}>{prompt}</label>
            <input
                type='text'
                className='text-input'
                onBlur={handleBlur}
                onChange={handleChange}/>
            {error && <p className="error">{error}</p>}
        </div>
    )
}
