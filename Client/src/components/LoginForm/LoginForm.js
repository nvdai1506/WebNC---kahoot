import React from "react";
import "./LoginForm.css";

function LoginForm({ type, name, id, placeholder, buttonContent }) {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form
        class="d-grid gap-2 col-4 mx-auto border border-dark rounded p-3"
        onSubmit={submitHandler}
      >
        <div class="mb-1">
          <input
            type={type}
            name={name}
            class="form-control"
            id={id}
            placeholder={placeholder}
          />
        </div>

        <button type="submit" class="btn btn-dark">
          {buttonContent}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
