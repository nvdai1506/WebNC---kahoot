import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm({ type, name, id, placeholder, buttonContent, onLogin }) {
  const [enteredName, setEnteredName] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(enteredName);
  };

  return (
    <div>
      <form
        className="col-4 mx-auto border border-dark rounded p-3"
        onSubmit={submitHandler}
      >
        <div class="mb-1">
          <input
            type={type}
            name={name}
            className="form-control text-center"
            id={id}
            placeholder={placeholder}
            value={enteredName}
            onChange={nameChangeHandler}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          {buttonContent}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
