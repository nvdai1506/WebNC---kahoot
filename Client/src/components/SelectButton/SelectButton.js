import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SelectButton({ btnColor }) {
  return (
    <div>
      <button type="button" className={`btn ${btnColor} col-12 p-5`}>
        <FontAwesomeIcon icon="fa-solid fa-triangle" />
      </button>
    </div>
  );
}

export default SelectButton;
