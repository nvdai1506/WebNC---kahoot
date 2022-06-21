import React from "react";
import SelectButton from "../components/SelectButton/SelectButton";

function PlayScreen() {
  return (
    <div id="play-game" class="">
      <div>
        <header className="row">
          <h1>1 of 10</h1>
        </header>
        <main className="row mt-5">
          <div class="row row-cols-2">
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
        <footer className="row mt-5">
          <div className="d-flex justify-content-between">
            <h1>Name</h1>
            <h1>0</h1>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default PlayScreen;
