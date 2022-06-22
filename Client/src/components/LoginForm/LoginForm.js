import React, { useState, useEffect, useReducer } from "react";
import "./LoginForm.css";

const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.length > 6 };
  }
  return { value: "", isValid: false };
};

function LoginForm({ type, name, id, placeholder, buttonContent, onLogin }) {
  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: false,
  });

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(nameState.value);
  };

  return (
    <div>
      <form
        className="col-4 mx-auto border border-dark rounded p-3"
        onSubmit={submitHandler}
      >
        <div className="mb-1">
          <input
            type={type}
            name={name}
            className="form-control text-center"
            id={id}
            placeholder={placeholder}
            value={nameState.value}
            onChange={nameChangeHandler}
          />
        </div>

        <button
          type="submit"
          className={`btn ${
            nameState.isValid ? "btn-primary" : "btn-dark"
          } w-100`}
        >
          {buttonContent}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
