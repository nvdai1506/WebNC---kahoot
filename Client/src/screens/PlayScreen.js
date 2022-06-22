import React from "react";
import SelectButton from "../components/SelectButton/SelectButton";
import SelectGroup from "../components/SelectGroup/SelectGroup";

function PlayScreen() {
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
          <h1>Name</h1>
          <h1>0</h1>
        </div>
      </footer>
    </div>
  );
}

export default PlayScreen;
