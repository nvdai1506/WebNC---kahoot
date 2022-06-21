import React from "react";

function WaitScreen() {
  return (
    <div id="wait-game">
      <div>
        <main>
          <div>
            <h1 className="d-grid gap-2 col-4 mx-auto">You're in!</h1>
            <h5 className="d-grid gap-2 col-4 mx-auto">
              See your nickname on screen?
            </h5>
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

export default WaitScreen;
