import React, {useState, useEffect } from "react";

const QuestionForm = () => {
    const [questions, setQuestions] = useState({
        "orderId": null,
        "text": "",
        "category": "",
        "field": "",
        "answers": []
    });
    const [counter, setCounter] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(questions);
    }

    const handleChange = (event) => {
        setQuestions({
          ...questions,
            [event.target.name]: event.target.value
        });
    }

    const renderAnswerInputs = (question) => {
        switch(question.type) {
            case 'single':
                return question.answers.map((answers) => (
                    <div key={answer.value}>
                        <input type='radio' name='' value={answers.text} />
                    </div>
                ));
            case 'multiple':
            case 'text':
            case 'range':
        }
    }

    return (
      <form onSubmit={handleSubmit}>

      </form>
    );
}