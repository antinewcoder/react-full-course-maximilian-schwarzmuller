import {forwardRef, useImperativeHandle, useRef} from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref){
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattingRemainingTime = (remainingTime / 1000).toFixed(2);
    
    // Calculate score: 100 points for stopping at exactly 0, 0 points for stopping at target time or later
    const timeAccuracy = Math.max(0, (targetTime * 1000 - remainingTime) / (targetTime * 1000));
    const score = Math.round(timeAccuracy * 100);

    useImperativeHandle(ref, ()=> {
        return {
            open(){
                dialog.current.showModal(); 
            }
        }
    });
    return createPortal(
        <dialog ref={dialog} className="result-modal">
            {userLost && <h2>You lost!</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p> The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}.</strong></p>
            <p>You stopped the timer with <strong> {formattingRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>

        </dialog>,
        document.getElementById('modal')

    )
});
export default ResultModal;