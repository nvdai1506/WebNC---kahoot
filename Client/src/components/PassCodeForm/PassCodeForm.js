import React, { useState, useReducer, useContext } from "react";
import PlayContext from "../../context/PlayContext";
import "./PassCodeForm.css";
import { Link, useHistory } from "react-router-dom";

const passReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.match(/[0-9]{4}/) };
  }
  if (action.type === "CLEAR_INPUT") {
    return { value: "", isValid: false };
  }
  return { value: "", isValid: false };
};

function PassCodeForm({ type, name, id, placeholder, buttonContent }) {
  let history = useHistory();
  const ctx = useContext(PlayContext);

  const [passState, dispatchPass] = useReducer(passReducer, {
    value: "",
    isValid: false,
  });

  const passChangeHandler = (event) => {
    dispatchPass({ type: "USER_INPUT", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onValidation(passState);

    dispatchPass({ type: "CLEAR_INPUT" });
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
            value={passState.value}
            onChange={passChangeHandler}
          />
        </div>

        <button
          type="submit"
          className={`btn ${
            passState.isValid ? "btn-primary" : "btn-dark"
          } w-100`}
        >
          {buttonContent}
        </button>
      </form>
    </div>
  );
}

export default PassCodeForm;
