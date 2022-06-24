import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function WrongAnswer() {
  return (
    <div>
      <h1 className="text-center">Incorrect</h1>
      <div className="text-center">
        <AiFillCloseCircle color="red" size="5em" />
      </div>
      <h2 className="text-center">You can still turn the tables!</h2>
    </div>
  );
}

export default WrongAnswer;
