import React from "react";
import SelectButton from "../components/SelectButton/SelectButton";

function PlayScreen() {
  return (
    <div id="play-game">
      <div>
        <main>
          <div className="d-grid gap-2">
            <div className="row">
              <div className="col">
                <SelectButton btnColor="btn-danger" shape="triangle" />
              </div>
              <div className="col">
                <SelectButton btnColor="btn-primary" shape="diamond" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <SelectButton btnColor="btn-warning" shape="circle" />
              </div>
              <div className="col">
                <SelectButton btnColor="btn-success" shape="square" />
              </div>
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
    </div>
  );
}

export default PlayScreen;
