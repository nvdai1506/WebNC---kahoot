import React, { useState, useEffect, useContext } from "react";
import SelectButton from "../SelectButton/SelectButton";
import PlayContext from "../../context/PlayContext";
import { Link, useHistory } from "react-router-dom";

let startTime, endTime;

function SelectGroup() {
  let history = useHistory();
  const ctx = useContext(PlayContext);

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (answer === "") startTime = performance.now();

    if (answer !== "") {
      endTime = performance.now();
      let responseTime = Math.round((endTime - startTime) / 1000);

      ctx.onAnswerScore(responseTime);

      // history.push(`${ctx.url}/result`, { isCorrect: answer === ctx.answer });

      ctx.onAnswerQuestion(answer);
    }
  }, [answer]);

  return (
    <>
      <div className={`row row-cols-2 h-100 ${answer ? 'no-pointer' : ''}`}>
        <div className={`col p-0 ${answer && answer !== 1 ? 'item-disable' : ''}`}>
          <SelectButton
            btnColor="btn-danger"
            shape="triangle"
            onButtonHandler={!answer && (() => setAnswer(1))}
          />
        </div>
        <div className={`col p-0 ${answer && answer !== 2 ? 'item-disable' : ''}`}>
          <SelectButton
            btnColor="btn-primary"
            shape="diamond"
            onButtonHandler={!answer && (() => setAnswer(2))}
          />
        </div>
        {ctx.questionType === 1 &&
        <div className={`col p-0 ${answer && answer !== 3 ? 'item-disable' : ''}`}>
          <SelectButton
            btnColor="btn-warning"
            shape="circle"
            onButtonHandler={!answer && (() => setAnswer(3))}
          />
        </div>}
        {ctx.questionType === 1 &&
          <div className={`col p-0 ${answer && answer !== 4 ? 'item-disable' : ''}`}>
          <SelectButton
            btnColor="btn-success"
            shape="square"
            onButtonHandler={!answer && (() => setAnswer(4))}
          />
        </div>}
      </div>
    </>
  );
}

export default SelectGroup;
