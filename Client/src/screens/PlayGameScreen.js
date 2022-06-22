import React, { useState, useEffect } from "react";
import PlayContext from "../context/PlayContext";
import LoginScreen from "./LoginScreen";
import PlayScreen from "./PlayScreen";
import WaitScreen from "./WaitScreen";

function PlayGameScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
      // localStorage.setItem("isLoggedIn", "1");
      // setIsLoggedIn(true);
      // localStorage.removeItem('isLoggedIn');
    }
  }, []);

  const loginHandler = (username) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    setUsername(username);
  };

  return (
    <PlayContext.Provider
      value={{
        isLoggedIn: false,
        username: username,
        score: score,
        onLogin: loginHandler,
      }}
    >
      {!isLoggedIn && <LoginScreen />}
      {isLoggedIn && <WaitScreen />}
    </PlayContext.Provider>
  );
}

export default PlayGameScreen;
