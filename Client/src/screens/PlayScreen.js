import React, { useContext } from "react";
import SelectGroup from "../components/SelectGroup/SelectGroup";
import PlayContext from "../context/PlayContext";

function PlayScreen() {
  const ctx = useContext(PlayContext);

  return (
    <div
      id="play-game"
      className="h-100 d-flex flex-column justify-content-between"
    >
      <header>
        <h1>1 of 10</h1>
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
