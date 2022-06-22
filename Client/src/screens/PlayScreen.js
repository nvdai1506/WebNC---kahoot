import React from "react";
import SelectButton from "../components/SelectButton/SelectButton";
import SelectGroup from "../components/SelectGroup/SelectGroup";

function PlayScreen({username, score}) {
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
          <h1>{username}</h1>
          <h1>{score}</h1>
        </div>
      </footer>
    </div>
  );
}

export default PlayScreen;
