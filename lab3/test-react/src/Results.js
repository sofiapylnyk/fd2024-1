import React from 'react';

const Results = ({ results, onReset }) => (
  <div>
    <h2>Результати тесту</h2>
    <p>Ви відповіли на {results.score} з {results.total} питань правильно.</p>
    <button onClick={onReset}>Повернутись до вибору питань</button>
  </div>
);

export default Results;
