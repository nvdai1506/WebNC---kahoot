import React, { useContext } from "react";
import PlayContext from "../../context/PlayContext";
import { AiFillCheckCircle } from "react-icons/ai";

function CorrectAnswer() {
  const ctx = useContext(PlayContext);

  return (
    <div>
      <h1 className="text-center">Correct</h1>
      <div className="text-center">
        <AiFillCheckCircle color="green" size="5em" />
      </div>
      <h2 className="text-center">{`+ ${ctx.answerScore}`}</h2>
    </div>
  );
}

export default CorrectAnswer;
