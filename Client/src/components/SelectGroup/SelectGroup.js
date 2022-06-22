import React, { useState } from "react";
import SelectButton from "../SelectButton/SelectButton";

function SelectGroup() {
  const [answer, setAnswer] = useState("");
  console.log(answer);

  return (
    <>
      <div className="row row-cols-2 h-100">
        <div className="col p-0">
          <SelectButton
            btnColor="btn-danger"
            shape="triangle"
            onButtonHandler={setAnswer}
          />
        </div>
        <div className="col p-0">
          <SelectButton
            btnColor="btn-primary"
            shape="diamond"
            onButtonHandler={setAnswer}
          />
        </div>
        <div className="col p-0">
          <SelectButton
            btnColor="btn-warning"
            shape="circle"
            onButtonHandler={setAnswer}
          />
        </div>
        <div className="col p-0">
          <SelectButton
            btnColor="btn-success"
            shape="square"
            onButtonHandler={setAnswer}
          />
        </div>
      </div>
    </>
  );
}

export default SelectGroup;
