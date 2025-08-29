import { useState } from 'react';
import Input from './Input.jsx';

export default function Login() {

  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  })
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  })
  
  const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
  const passwordIsInvalid = didEdit.password && enteredValues.password.trim().length < 6;

  function handleSubmit(event){
    event.preventDefault();
  }
  
  function handleInputChange(identifier, value){
    setEnteredValues((prevEnteredValues) => {
      return {
        ...prevEnteredValues,
        [identifier]: value
      }
    })
    setDidEdit((prevEdit) => {
      return {
        ...prevEdit,
        [identifier]: false
      }
    })
  }

  function handleReset() {
    setEnteredValues({
      email: '',
      password: ''
    });
  }
  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => {
      return {
        ...prevEdit,
        [identifier]: true
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <Input 
            label="Email"
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur('email')}
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
            error={emailIsInvalid && "Please enter a valid email address!"}
          />

        </div>

        <div className="control no-margin">
        <Input 
            label="Password"
            id="password"
            type="password"
            name="password"
            onBlur={() => handleInputBlur('password')}
            onChange={(event) => handleInputChange("password", event.target.value)}
            value={enteredValues.password}
            error={ passwordIsInvalid && "Password must be at least 6 characters long!"}
          />
        </div>
      </div>

      <p className="form-actions">
        <button type="button" className="button button-flat" onClick={handleReset}>Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
