import React, { useState, useContext, useEffect } from "react";
import RingLoader from "react-spinners/RingLoader";
import PlayContext from "../../context/PlayContext";
import { Link, useHistory } from "react-router-dom";

function GetReadyScreen() {
  let history = useHistory();
  const ctx = useContext(PlayContext);

  useEffect(() => {
    if (ctx.isPlaying === true) {
      setTimeout(() => {
        history.push(`${ctx.url}/gameblock`);
      }, 5000);
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
          <h1 className="text-center">Get Ready!</h1>
          <div className="text-center">
            <RingLoader
              color={"#000000"}
              loading={true}
              size={100}
              cssOverride={{ margin: "0 auto" }}
            />
          </div>
          <h2 className="text-center">Loading...</h2>
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

export default GetReadyScreen;
