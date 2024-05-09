import React, { useState } from 'react';

const TestQuestion = ({ question, onAnswerSelected }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerChange = (answer) => {
    setSelectedAnswer(answer);
    onAnswerSelected(question.id, answer.isCorrect);
  };

  if (!question) {
    return <div>Питання не знайдене</div>;
  }

  return (
    <div>
      <h3>{question.question}</h3>
      {question.answers.map((a, index) => (
        <label key={index}>
          <input
            type="radio"
            name={`question-${question.id}`}
            checked={selectedAnswer === a}
            onChange={() => handleAnswerChange(a)}
          />
          {a.answer}
        </label>
      ))}
    </div>
  );
};

export default TestQuestion;
