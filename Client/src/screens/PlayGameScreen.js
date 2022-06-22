import React, { useState, useEffect } from "react";
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
    <>
      {!isLoggedIn && <LoginScreen onLogin={loginHandler} />}
      {isLoggedIn && <PlayScreen username={username} score={score} />}
    </>
  );
}

export default PlayGameScreen;
