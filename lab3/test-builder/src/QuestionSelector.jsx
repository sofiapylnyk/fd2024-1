import React, { useState } from 'react';

const QuestionSelector = ({ questions, onQuestionsSelected }) => {
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);

  const handleCheckboxChange = (questionId) => {
    setSelectedQuestionIds((prevSelected) => {
      if (prevSelected.includes(questionId)) {
        return prevSelected.filter((id) => id !== questionId);
      } else {
        return [...prevSelected, questionId];
      }
    });
  };

  const handleStartTest = () => {
    const selectedQuestions = questions.filter((q) =>
      selectedQuestionIds.includes(q.id)
    );
    onQuestionsSelected(selectedQuestions);
  };

  return (
    <div>
      <h2>Виберіть питання для тесту</h2>
      {questions.map((question) => (
        <div key={question.id}>
          <input
            type="checkbox"
            checked={selectedQuestionIds.includes(question.id)}
            onChange={() => handleCheckboxChange(question.id)}
          />
          {question.question}
        </div>
      ))}
      <button onClick={handleStartTest} disabled={selectedQuestionIds.length === 0}>
        Почати тест
      </button>
    </div>
  );
};

export default QuestionSelector;
