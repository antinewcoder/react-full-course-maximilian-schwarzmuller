import Header from './components/Header.jsx';
import UserInput from "./components/Input.jsx";
import {useState} from 'react';
import Results from "./components/Results.jsx";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 100,
    annualInvestment: 100,
    expectedReturn: 100,
    duration: 1
});

const inputIsValid = userInput.initialInvestment >= 0 &&
                     userInput.annualInvestment >= 0 &&
                     userInput.expectedReturn >= 0 &&
                     userInput.duration >= 1;
function handleChange(inputName, value){
    setUserInput(prevInput => {
        return {
            ...prevInput,
            [inputName]: +value
        };
    }
    );
}
  return (
    <>
      <Header />
      <UserInput onEdit= {handleChange} userInput={userInput}/>
      {!inputIsValid && <p>Please enter valid input!</p>}
      {inputIsValid && <Results userInput={userInput} />}
    </>
  );
}

export default App
