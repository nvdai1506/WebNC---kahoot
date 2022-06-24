import React, { useContext, useEffect } from "react";
import PlayContext from "../../context/PlayContext";
import { Link, useHistory } from "react-router-dom";
import WrongAnswer from "../../components/WrongAnswer/WrongAnswer";
import CorrectAnswer from "../../components/CorrectAnswer/CorrectAnswer";

function ResultScreen() {
  let history = useHistory();
  const ctx = useContext(PlayContext);

  useEffect(() => {
    ctx.onScore(ctx.isCorrect);

    if (true) {
      setTimeout(() => {
        history.push(`${ctx.url}/gameblock`);
      }, 5000);
    }
  }, []);

  return (
    <div
      id="result-game"
      className="container vh-100 d-flex flex-column justify-content-between"
    >
      <div></div>
      <main>{ctx.isCorrect ? <CorrectAnswer /> : <WrongAnswer />}</main>
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
