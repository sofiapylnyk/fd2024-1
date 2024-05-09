import React, { useState } from 'react';
import './App.css';
import QuestionSelector from './QuestionSelector';
import Test from './Test';
import Results from './Results';
import testData from './testData.json';

const App = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [startTest, setStartTest] = useState(false);
  const [results, setResults] = useState(null);

  const handleSelectQuestions = (questions) => {
    setSelectedQuestions(questions);
    setStartTest(true);
  };

  const handleTestCompletion = (result) => {
    setResults(result);
  };

  const handleReset = () => {
    setResults(null);
    setSelectedQuestions([]);
    setStartTest(false);
  };

  return (
    <div className="app-container">
      {results ? (
        <Results results={results} onReset={handleReset} />
      ) : startTest ? (
        <Test
          questions={selectedQuestions}
          onCompletion={handleTestCompletion}
        />
      ) : (
        <QuestionSelector
          questions={testData.questions}
          onSelectQuestions={handleSelectQuestions}
        />
      )}
    </div>
  );
};

export default App;
