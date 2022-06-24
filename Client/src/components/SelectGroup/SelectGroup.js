import React, { useState, useEffect, useContext } from "react";
import SelectButton from "../SelectButton/SelectButton";
import PlayContext from "../../context/PlayContext";
import { Link, useHistory } from "react-router-dom";

function SelectGroup() {
  let history = useHistory();
  const ctx = useContext(PlayContext);

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (answer !== "") {
      ctx.onAnswer(answer === ctx.answer);

      setTimeout(() => {
        history.push(`${ctx.url}/result`);
      }, 2000);
    }
  }, [answer]);

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
