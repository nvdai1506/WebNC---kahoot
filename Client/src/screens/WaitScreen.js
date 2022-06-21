import React from "react";

function WaitScreen() {
  return (
    <div id="wait-game" className="container vh-100">
      <div>
        <main className="row mt-5">
          <div>
            <h1 className="d-flex align-items-center justify-content-center">
              You're in!
            </h1>
            <h5 className="d-flex align-items-center justify-content-center">
              See your nickname on screen?
            </h5>
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

export default WaitScreen;
