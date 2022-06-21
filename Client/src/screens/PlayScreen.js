import React from "react";
import SelectButton from "../components/SelectButton/SelectButton";

function PlayScreen() {
  return (
    <div
      id="play-game"
      className="container vh-100 d-flex flex-column justify-content-between"
    >
      <header>
        <h1>1 of 10</h1>
      </header>
      <main class="container vh-100 d-flex flex-column justify-content-center">
        <div class="row row-cols-2 h-100">
          <div class="col p-0">
            <SelectButton btnColor="btn-danger" shape="triangle" />
          </div>
          <div class="col p-0">
            <SelectButton btnColor="btn-primary" shape="diamond" />
          </div>
          <div class="col p-0">
            <SelectButton btnColor="btn-warning" shape="circle" />
          </div>
          <div class="col p-0">
            <SelectButton btnColor="btn-success" shape="square" />
          </div>
        </div>
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
