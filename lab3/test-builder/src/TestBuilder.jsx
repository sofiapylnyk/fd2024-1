import React, { useState } from 'react';
import QuestionSelector from './QuestionSelector';
import TestView from './TestView';

const TestBuilder = ({ questions }) => {
  const [selectedQuestions, setSelectedQuestions] = useState(null);

  const handleQuestionsSelected = (questions) => {
    setSelectedQuestions(questions);
  };

  return (
    <div>
      {selectedQuestions ? (
        <TestView questions={selectedQuestions} />
      ) : (
        <QuestionSelector questions={questions} onQuestionsSelected={handleQuestionsSelected} />
      )}
    </div>
  );
};

export default TestBuilder;
