export function useInput(defaultValue){
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    function handleInputChange(value){
        setEnteredValue(value);
        setDidEdit(false);
    }
    function handleInputBlur(){
        setDidEdit(true);
    }
    return {
        value: enteredValue,
        handleInputBlur,
        handleInputChange
    }
}