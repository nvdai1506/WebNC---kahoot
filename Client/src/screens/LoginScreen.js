import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import imgKahootLogo from "../static/image/kahoot-logo.png";

function LoginScreen({ onLogin }) {
  return (
    <div id="login-game">
      <main>
        <div className="text-center">
          <img src={imgKahootLogo} width="300px" alt="" />
        </div>

        {/* <LoginForm
          type="tel"
          name="gameId"
          id="game-input"
          placeholder="Game PIN"
          buttonContent="Enter"
        /> */}

        <LoginForm
          type="tel"
          name="gameId"
          id="game-input"
          placeholder="Nickname"
          buttonContent="OK, go!"
          onLogin={onLogin}
        />
      </main>
    </div>
  );
}

export default LoginScreen;
