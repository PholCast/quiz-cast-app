import { useEffect, useState } from 'react'
import Header from './components/Header'
import Question from './components/Question';
import { FourSquare } from "react-loading-indicators";

const App = () => {
  const [questionNum, setQuestionNum] = useState(0)
  const [questions, setQuestions] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isFirstAttempt,setIsFirstAttempt] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [roundNumber, setRoundNumber] = useState(0)
  const resetQuiz = async () => {

    setIsLoading(true)
    try {


      const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=base64")

      if (!response.ok) {
        throw new Error("error obteniendo las preguntas")
      }

      let data = await response.json()


      const questionsFormatted = data.results.map(q => {
        const options = [...q.incorrect_answers.map(a =>atob(a))]; // Copia segura del array
        const randomInt = Math.floor(Math.random() * 3);
        options.splice(randomInt, 0, atob(q['correct_answer']))

        console.log(atob(q.question))

        return {
          question: atob(q.question),
          correctAnswer: atob(q.correct_answer),
          options
        }

      })
      console.log("esto es data:")
      console.log(questionsFormatted)

      setQuestions(questionsFormatted)
      setCorrectAnswers(0);
      
      if (isFirstAttempt) {
      setQuestionNum(0); 
      setIsFirstAttempt(false); 
    } else {
      setQuestionNum(1);
    }
      
      setIsLoading(false)

    } catch {

    }
    

  }
 
  useEffect(() => {
    resetQuiz()
  }, [roundNumber])

  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <main className="flex-1 bg-primary flex justify-center items-center">
        <section className="w-2/3 h-3/4 border rounded-2xl bg-amber-50 p-4 flex flex-col justify-center items-center max-sm:h-3/4">
          {isLoading ? (
            <FourSquare color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />

          ) : questionNum === 0 ? (
            <>
              <h2 className='text-center text-4xl'>Welcome to QuizCast!</h2>
              <div className="flex-1 flex justify-center items-center">
                <button onClick={() => setQuestionNum(prev => prev + 1)}
                  className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 active:scale-110">
                  Start quiz!
                </button>
              </div>
            </>
          ) : questionNum === (questions.length + 1) ? (
            <>
              <div>Quiz finalizado: {correctAnswers}/{questions.length}</div>
              <button className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 active:scale-110" onClick={()=> setRoundNumber(p => p + 1)}>Reiniciar</button>
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
                  style={{ width: `${((questionNum) / questions.length) * 100}%` }}>
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