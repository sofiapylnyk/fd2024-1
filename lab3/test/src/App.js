import React, { useState } from 'react';
import testData from './components/testData.json';
import TestSelection from './components/TestSelection';
import TestView from './components/TestView';
import TestResults from './components/TestResults';

const App = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [testResults, setTestResults] = useState(null);

  const handleSelectTest = (test) => {
    setSelectedTest(test);
    setTestResults(null); // Скинути результати при виборі нового тесту
  };

  const handleFinishTest = (results) => {
    const correctAnswers = Object.values(results).filter((isCorrect) => isCorrect).length;
    setTestResults({
      correctAnswers,
      totalQuestions: selectedTest.questions.length,
    });
    setSelectedTest(null); // Повернутися до вибору тестів
  };

  const handleRestart = () => {
    setSelectedTest(null); // Повернення до вибору тестів
    setTestResults(null); // Скинути результати
  };

  return (
    <div>
      {testResults ? (
        <TestResults 
          correctAnswers={testResults.correctAnswers} 
          totalQuestions={testResults.totalQuestions} 
          onRestart={handleRestart}
        />
      ) : selectedTest ? (
        <TestView test={selectedTest} onFinishTest={handleFinishTest} />
      ) : (
        <TestSelection tests={testData.tests} onSelectTest={handleSelectTest} />
      )}
    </div>
  );
};

export default App;
