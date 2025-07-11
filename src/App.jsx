import { useEffect, useState } from 'react'
import Header from './components/Header'
import Question from './components/Question';
import { FourSquare } from "react-loading-indicators";

const App = () => {
  const [questionNum, setQuestionNum] = useState(0)
  const [correctAnswers,setCorrectAnswers] = useState(0)

  const [isLoading,setIsLoading] = useState(false)

  const resetQuiz = async () => {

    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
      setQuestionNum(1)
      setCorrectAnswers(0)
    },2000)

  }
  let questions = [
    {
      question: "¿Cuál es la capital de Francia?",
      options: ["Madrid", "Berlín", "París", "Roma"],
      correctAnswer: "París"
    },
    {
      question: "¿Qué planeta es conocido como el planeta rojo?",
      options: ["Tierra", "Marte", "Júpiter", "Venus"],
      correctAnswer: "Marte"
    },
    {
      question: "¿Quién escribió 'Cien años de soledad'?",
      options: ["Pablo Neruda", "Mario Vargas Llosa", "Gabriel García Márquez", "Julio Cortázar"],
      correctAnswer: "Gabriel García Márquez"
    },
    {
      question: "¿Cuál es el resultado de 3 × 4?",
      options: ["6", "12", "9", "14"],
      correctAnswer: "12"
    },
    {
      question: "¿Qué idioma se habla en Brasil?",
      options: ["Portugués", "Español", "Italiano", "Francés"],
      correctAnswer: "Portugués"
    }
  ];
 
  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <main className="flex-1 bg-primary flex justify-center items-center">
        <section className="w-2/3 h-3/4 border rounded-2xl bg-amber-50 p-4 flex flex-col justify-center items-center">
          {isLoading ? (
            <FourSquare color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />

          ) : questionNum === 0 ? (
            <>
              <h2 className='text-center text-4xl'>Welcome to QuizCast!</h2>
              <div className="flex-1 flex justify-center items-center">
                <button onClick={() => setQuestionNum(prev => prev + 1)}
                  className="px-4 py-2 bg-blue-600 cursor-pointer
                    text-white rounded hover:bg-blue-700 
                      active:scale-110">
                  Start quiz!
                </button>
              </div>
            </>
          ) : questionNum === (questions.length+1) ? (
            <>
              <div>Quiz finalizado: {correctAnswers}/{questions.length}</div>
              <button className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 active:scale-110" onClick={resetQuiz}>Reiniciar</button>
            </>

          ) : (
            <>
              <Question 
                  questions={questions[questionNum - 1]} 
                  correctAnswers={correctAnswers} 
                  setCorrectAnswers={setCorrectAnswers}
                  setQuestionNum={setQuestionNum}
                  questionNum={questionNum}
                  numberOfQuestions={questions.length} />
              
              <div className='h-2 w-full rounded-full bg-slate-300'>
                <div className='h-2 bg-blue-600 rounded-full transition-all'
                      style={{ width: `${((questionNum)/questions.length)*100}%`}}>
                </div>
              </div>
            </>
          )}

        </section>
      </main>
    </div>
  );
};

export default App