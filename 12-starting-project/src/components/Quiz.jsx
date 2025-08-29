import  {useState, useCallback, } from 'react';
import QUESTIONS from '../data/questions.json';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';
import Answers from "./Answers.jsx"

export default function Quiz(){
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState("");

    const activeQuestionIndex = 
    answerState === '' ? userAnswers.length : userAnswers.length -1;
    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;
   
    const handleSelectAnswer = useCallback(function handleSelectAnswer(answer){
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, answer]
        });
        setTimeout(() => {
            if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState("correct");
            } else {
                setAnswerState("wrong");
            }
            setTimeout(() => {
                setAnswerState("");
            }, 2000);
        }, 1000)
    },[activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer])

    if (quizIsCompleted) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy icon" />
                <h2>Quiz Completed!</h2>
                <p>Your answers: {userAnswers.join(', ')}</p>
            </div>

        );
    }
    if (!shuffledAnswers.current){
    const shuffledAnswers =[...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    }
    
    return (
        <div id="quiz">
            <div id="question">
            <QuestionTimer 
                key={activeQuestionIndex}
                timeout={30000} 
                onTimeout={handleSkipAnswer}
            />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <Answers 
                answers={QUESTIONS[activeQuestionIndex].text} 
                selectedAnswer={userAnswers[userAnswers.length - 1]} 
                answerState={answerState}
                 />
            
            </div>

        </div>
    
    )
    
}