import React, { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import imgKahootLogo from "../static/image/kahoot-logo.png";

function LoginScreen(props) {
  return (
    <div id="login-game">
      <div>
        <main>
          <div className="mb-2 col-4 mx-auto">
            <img src={imgKahootLogo} width="400px" alt="" />
          </div>

          <LoginForm
            type="tel"
            name="gameId"
            id="game-input"
            placeholder="Game PIN"
            buttonContent="Enter"
          />

          {/* <LoginForm
              type="tel"
              name="gameId"
              id="game-input"
              placeholder="Nickname"
              buttonContent="OK, go!"
            /> */}
        </main>
      </div>
    </div>
  );
}

export default LoginScreen;
