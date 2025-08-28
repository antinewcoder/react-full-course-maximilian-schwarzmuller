import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimeChallenge({title, targetTime}){

const timer = useRef();
const dialog = useRef();
    
const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
const [timerStarted, setTimerStarted] = useState(false);
const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

function handleStart(){
    setTimerStarted(true);
    timer.current = setInterval(()=>{
        setTimeRemaining(prevTimeRemaining => {
            const newTime = prevTimeRemaining - 10;
            if (newTime <= 0){
                clearInterval(timer.current);
                setTimeRemaining(0);
                dialog.current.open();
                return 0;
            }
            return newTime;
        });
    }, 10);
}

function handleReset(){
    setTimeRemaining(targetTime * 1000);
    setTimerStarted(false);
}

function handleStop(){
    clearInterval(timer.current);
    setTimerStarted(false);
    dialog.current.open();
}

    return (
    <>
     <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
    <section className="challenge">
        <h2>{title}</h2>
        
        <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
            <button onClick = { timerIsActive ? handleStop : handleStart}> 
                {timerIsActive? "Stop" : "Start"} Challenge
            </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
            {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>

    </section>
   
    </>
    );
}