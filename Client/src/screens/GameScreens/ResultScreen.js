import React, { useContext, useEffect } from "react";
import PlayContext from "../../context/PlayContext";
import { Link, useHistory } from "react-router-dom";
import WrongAnswer from "../../components/WrongAnswer/WrongAnswer";
import CorrectAnswer from "../../components/CorrectAnswer/CorrectAnswer";
import TimeUp from "../../components/TimeUp/TimeUp";

function ResultScreen(props) {
  let history = useHistory();
  const ctx = useContext(PlayContext);

  useEffect(() => {
    ctx.onScore(props.history.location.state?.isCorrect);
    // ctx.onQuestion();

    // setTimeout(() => {
    //   history.push(`${ctx.url}/getready`);
    // }, 3000);
  }, []);

  return (
    <div
      id="result-game"
      className="container d-flex flex-column justify-content-between"
      style={{height: 'calc(100vh - 65px)'}}
    >
      <div></div>
      <main>
        {props.history.location.state?.isTimeup ? (
          <TimeUp />
        ) : (
          <>
            {props.history.location.state?.isCorrect ? (
              <CorrectAnswer />
            ) : (
              <WrongAnswer />
            )}
          </>
        )}
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

export default ResultScreen;
