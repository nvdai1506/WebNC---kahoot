import React, { useState, useReducer, useContext } from "react";
import PlayContext from "../../context/PlayContext";
import "./LoginForm.css";
import { Link, useRouteMatch } from "react-router-dom";

const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.length > 5 };
  }
  if (action.type === "CLEAR_INPUT") {
    return { value: "", isValid: false };
  }
  return { value: "", isValid: false };
};

function LoginForm({ type, name, id, placeholder, buttonContent }) {
  const ctx = useContext(PlayContext);

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: false,
  });

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(nameState.value);

    dispatchName({ type: "CLEAR_INPUT" });
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

        <Link to={`${ctx.url}/instruction`}>
          <button
            type="submit"
            className={`btn ${
              nameState.isValid ? "btn-primary" : "btn-dark"
            } w-100`}
          >
            {buttonContent}
          </button>
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
