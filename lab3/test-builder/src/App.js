import React, { useState } from 'react';
import testData from './testData.json'; // JSON-файл, який містить всі питання
import TestBuilder from './TestBuilder'; // Компонент, що дозволяє вибирати питання та запускати тест

const App = () => {
  // Немає потреби відразу встановлювати стан, який визначає, які питання були обрані
  const [questions, setQuestions] = useState(testData.questions);

  return (
    <div>
      {/* Компонент TestBuilder приймає список питань і керує вибором питань та їх проходженням */}
      <TestBuilder questions={questions} />
    </div>
  );
};

export default App;
