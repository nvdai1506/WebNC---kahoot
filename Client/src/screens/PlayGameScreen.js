import React from "react";
import imgKahootLogo from "../static/image/kahoot-logo.png";

function PlayGameScreen(props) {
  return (
    <div id="play-game">
      <div>
        <main>
          <div class="mb-2 d-grid gap-2 col-4 mx-auto">
            <img src={imgKahootLogo} width="400px" alt="" />
          </div>
          <form class="d-grid gap-2 col-4 mx-auto border border-dark rounded p-3">
            <div class="mb-1">
              <input
                type="tel"
                name="gameId"
                class="form-control"
                id="game-input"
                placeholder="Game PIN"
              />
            </div>

            <button type="submit" class="btn btn-dark">
              Enter
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default PlayGameScreen;
