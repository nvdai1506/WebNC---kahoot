import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function TimeUp() {
  return (
    <div>
      <h1 className="text-center">Time's up</h1>
      <div className="text-center">
        <AiFillCloseCircle color="red" size="5em" />
      </div>
      <h2 className="text-center">Keep trying and turn things around!</h2>
    </div>
  );
}

export default TimeUp;
