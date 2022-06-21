import React from "react";
import SelectButton from "../components/SelectButton/SelectButton";

function PlayScreen() {
  return (
    <div id="play-game">
      <div>
        <main>
          <div class="d-grid gap-2">
            <div class="row">
              <div class="col">
                <SelectButton btnColor="btn-danger" />
              </div>
              <div class="col">
                <SelectButton btnColor="btn-primary" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <SelectButton btnColor="btn-warning" />
              </div>
              <div class="col">
                <SelectButton btnColor="btn-success" />
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
