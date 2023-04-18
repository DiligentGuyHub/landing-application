import '../styles/AnswerElement.css';

export const AnswerElement = ({question, type, handleAnswerSelect }) => {
    const handleChange = (answer) => (event) => {
        handleAnswerSelect(answer);
    };

    return (
        <div className='question-option-wrapper'>
            {question.answers.map((option) => (
                <div className='question-option' key={option._id}>
                    <input
                        type={type}
                        name='option'
                        className="question-option-input"
                        id={option._id}
                        value={option.text}
                        // checked={answers.includes(option._id)} // check if this option is selected
                        onChange={handleChange} // handle changes
                    />
                    <label className='question-option-label' htmlFor={option._id}>
                        {option.text}
                    </label>
                </div>
            ))}
        </div>
    );
}