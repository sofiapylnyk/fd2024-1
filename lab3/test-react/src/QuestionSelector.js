import React, { useState } from 'react';

const QuestionSelector = ({ questions, onSelectQuestions }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleToggleQuestion = (question) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(question)
        ? prevSelected.filter((q) => q !== question)
        : [...prevSelected, question]
    );
  };

  const handleStartTest = () => {
    onSelectQuestions(selectedQuestions);
  };

  return (
    <div className="question-selector">
      <h2>Виберіть питання для тесту</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <input
              type="checkbox"
              className="input-checkbox"
              checked={selectedQuestions.includes(question)}
              onChange={() => handleToggleQuestion(question)}
            />
            {question.question}
          </li>
        ))}
      </ul>
      <button onClick={handleStartTest} disabled={!selectedQuestions.length}>
        Почати тест
      </button>
    </div>
  );
};

export default QuestionSelector;
