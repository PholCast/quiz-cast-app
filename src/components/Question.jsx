import React, { useState } from 'react';

const Question = ({ questions, correctAnswers, setCorrectAnswers, setQuestionNum,questionNum, numberOfQuestions }) => {
  const [selectedIndex, setSelectedIndex] = useState(null); // cuál opción fue seleccionada
  const [isDisabled, setIsDisabled] = useState(false); // deshabilitar botones temporalmente

  const handleClick = (i) => {
    if (isDisabled) return; // previene múltiples clicks

    setSelectedIndex(i);
    setIsDisabled(true);

    const isAnswerCorrect = questions.correctAnswer === questions.options[i];
    if (isAnswerCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    // Esperar 1 segundo antes de pasar a la siguiente pregunta
    setTimeout(() => {
      setSelectedIndex(null);
      setIsDisabled(false);
      setQuestionNum(prev => prev + 1);
    }, 500);
  };

  return (
    <>
      <div className='flex justify-between items-center w-full mb-7  '>
        <div className='text-2xl  max-sm:text-xl max-sm:w-3/4'>{questionNum}. {questions.question}</div>
        <p className=' text-center max-sm:text-xs'><span className='ml-1 max-sm:hidden'>Pregunta</span> {questionNum}/{numberOfQuestions}</p>
      </div>
      <div className='w-full h-3/4 grid grid-cols-2 mb-4 gap-2 max-sm:grid-cols-1'>
        {questions.options.map((answer, i) => {
          const isCorrect = questions.correctAnswer === answer;
          const isSelected = selectedIndex === i;

          let buttonClass = 'rounded-2xl px-4 py-2 text-white transition-colors cursor-pointer ';
          if (selectedIndex !== null) {
            if (isSelected && isCorrect) {
              buttonClass += 'bg-green-600';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'bg-red-600';
            } else {
              buttonClass += 'bg-gray-400';
            }
          } else {
            buttonClass += 'bg-cyan-600 hover:bg-cyan-700';
          }

          return (
            <button
              key={i}
              className={buttonClass}
              onClick={() => handleClick(i)}
              disabled={isDisabled}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Question;
