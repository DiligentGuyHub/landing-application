import '../styles/AnswerElement.css';

export const AnswerElement = ({ answer, type, handleAnswerSelect }) => {
    const handleOnChange = (answer) => (event) => {
        handleAnswerSelect(answer);
    };

    return (
        <div className='answer-wrapper'>
            <input
                type={type}
                name='option'
                className="answer-input"
                id={answer._id}
                value={answer.text}/>
            <label className='answer-label' htmlFor={answer._id}>
                {answer.text}
            </label>
        </div>
    );
}