import React, { useContext, useEffect } from "react";
import PlayContext from "../../context/PlayContext";
import { Link, useHistory } from "react-router-dom";

function WaitScreen() {
  let history = useHistory();
  const ctx = useContext(PlayContext);

  useEffect(() => {
    if (ctx.isPlaying === true) {
      setTimeout(() => {
        history.push(`${ctx.url}/getready`);
      }, 3000);
    }
  }, []);

  return (
    <div
      id="wait-game"
      className="container vh-100 d-flex flex-column justify-content-between"
    >
      <div></div>
      <main>
        <div>
          <h1 className="text-center">You're in!</h1>
          <h5 className="text-center">See your nickname on screen?</h5>
        </div>
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

export default WaitScreen;
