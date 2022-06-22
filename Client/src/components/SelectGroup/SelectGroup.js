import React, { useState } from "react";
import SelectButton from "../SelectButton/SelectButton";

function SelectGroup() {
  const [answer, setAnswer] = useState("");

  const buttonHandler = () => {};

  return (
    <>
      <div className="row row-cols-2 h-100">
        <div className="col p-0">
          <SelectButton
            btnColor="btn-danger"
            shape="triangle"
            onButtonHandler={buttonHandler}
          />
        </div>
        <div className="col p-0">
          <SelectButton
            btnColor="btn-primary"
            shape="diamond"
            onButtonHandler={buttonHandler}
          />
        </div>
        <div className="col p-0">
          <SelectButton
            btnColor="btn-warning"
            shape="circle"
            onButtonHandler={buttonHandler}
          />
        </div>
        <div className="col p-0">
          <SelectButton
            btnColor="btn-success"
            shape="square"
            onButtonHandler={buttonHandler}
          />
        </div>
      </div>
    </>
  );
}

export default SelectGroup;
