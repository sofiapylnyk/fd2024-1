const TestBuilder = ({ questions }) => {
    if (!questions || !Array.isArray(questions)) {
      return <div>Питання не знайдені</div>;
    }
    // якщо 'questions' визначені та є масивом
    return (
      <div>
        {questions.map((q, index) => (
          <div key={index}>{q.question}</div>
        ))}
      </div>
    );
  };
  