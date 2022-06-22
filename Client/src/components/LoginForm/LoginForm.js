import React from "react";
import "./LoginForm.css";

function LoginForm({ type, name, id, placeholder, buttonContent }) {
  return (
    <div>
      <form className="col-4 mx-auto border border-dark rounded p-3">
        <div class="mb-1">
          <input
            type={type}
            name={name}
            className="form-control text-center"
            id={id}
            placeholder={placeholder}
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
