import React, { useReducer, useContext } from "react";
import PlayContext from "../../context/PlayContext";
import "./LoginForm.css";

const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.length > 0 };
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
    ctx.onLogin(nameState);

    dispatchName({ type: "CLEAR_INPUT" });
  };

  return (
    <div>
      <form
        className="col-md-4 col-11 mx-auto border border-dark rounded p-3"
        onSubmit={submitHandler}
      >
        <div className="mb-1">
          <input
            type="text"
            name={name}
            className="form-control text-center"
            id={id}
            placeholder={placeholder}
            value={nameState.value}
            onChange={nameChangeHandler}
            maxLength={9}
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
