import React, { useState, useContext, useEffect } from "react";
import SelectGroup from "../../components/SelectGroup/SelectGroup";
import PlayContext from "../../context/PlayContext";
import { Link, useHistory } from "react-router-dom";

function PlayScreen() {
  let history = useHistory();
  const ctx = useContext(PlayContext);
  const [questionTime, setQuestionTime] = useState(ctx.questionTime);

  useEffect(() => {
    setTimeout(() => {
      setQuestionTime(questionTime - 1);
    }, 1000);

    if (questionTime === 0) {
      history.push(`${ctx.url}/result`, { isTimeup: true });
    }
  }, [questionTime]);

  return (
    <div
      id="play-game"
      className="h-100 d-flex flex-column justify-content-between"
    >
      <header className="d-flex justify-content-between">
        <h1>{`${ctx.questionNumber} of ${ctx.totalQuestion}`}</h1>
        <h1>{`${questionTime}s`}</h1>
      </header>
      <main className="h-100 d-flex flex-column justify-content-center">
        <SelectGroup />
      </main>
      <footer>
        <div className="d-flex justify-content-between">
          <h1>{ctx.username}</h1>
          <h1>{ctx.score}</h1>
        </div>
      </footer>
    </div>
  );
}

export default PlayScreen;
