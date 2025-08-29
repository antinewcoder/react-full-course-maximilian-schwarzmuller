
import {useRef} from 'react';
export default function Answers({answers, selectedAnswer, answerState}){
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current){
        shuffledAnswers.current = [...asnwers];
        shuffledAnswers.current.sort
    }

    return (
    <ul id="answers">
            {shuffledAnswers.map((answer) => {
                const isSelected = userAnswers[userAnswers.length - 1] === answer;
                let cssClasses = '';

                if (answerState === 'answered' && isSelected) {
                    cssClasses = 'selected';
                }
                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClasses = answerState;
                }
            }
        }
            return (
            <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)} className={}>
                    {answer}
                </button>
            </li> ) 
            )
            
            </ul>
)
}