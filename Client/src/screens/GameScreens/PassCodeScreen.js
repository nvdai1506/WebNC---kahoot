import React from "react";
import PassCodeForm from "../../components/PassCodeForm/PassCodeForm";
import imgKahootLogo from "../../static/image/kahoot-logo.png";

function PassCodeScreen() {
  return (
    <div id="login-game">
      <main>
        <div className="text-center">
          <img src={imgKahootLogo} width="300px" alt="" />
        </div>

        <PassCodeForm
          type="tel"
          name="gameId"
          id="game-input"
          placeholder="Game PIN"
          buttonContent="Enter"
        />
      </main>
    </div>
  );
}

export default PassCodeScreen;
