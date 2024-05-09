import React from 'react';

const TestSelection = ({ tests, onSelectTest }) => {
  return (
    <div>
      <h2>Виберіть тест</h2>
      {tests.map((test, index) => (
        <button key={index} onClick={() => onSelectTest(test)}>
          {test.testName}
        </button>
      ))}
    </div>
  );
};

export default TestSelection;
