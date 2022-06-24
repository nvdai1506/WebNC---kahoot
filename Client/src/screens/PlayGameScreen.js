import React, { useState, useEffect } from "react";
import PlayContext from "../context/PlayContext";
import LoginScreen from "./GameScreens/LoginScreen";
import PlayScreen from "./GameScreens/PlayScreen";
import WaitScreen from "./GameScreens/WaitScreen";
import PassCodeScreen from "./GameScreens/PassCodeScreen";
import ResultScreen from "./GameScreens/ResultScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

function PlayGameScreen() {
  let { path, url } = useRouteMatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isValidation, setIsValidation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [answer, setAnswer] = useState("triangle");
  const [answerScore, setAnswerScore] = useState(500);
  const [isCorrect, setIsCorrect] = useState(false);
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
      // localStorage.setItem("isLoggedIn", "1");
      // setIsLoggedIn(true);
      // localStorage.removeItem('isLoggedIn');
    }
    if (localStorage.getItem("isValidation") === "1") {
      setIsValidation(true);
    }
  }, []);

  const loginHandler = (isLogin) => {
    if (isLogin) {
      localStorage.setItem("isLoggedIn", "1");
      setIsLoggedIn(true);
    }
  };

  const validationHandler = (isValid) => {
    if (isValid) {
      localStorage.setItem("isValidation", "1");
      setIsValidation(true);
    }
  };

  const answerHandler = (isCorrect) => {
    if (isCorrect) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const usernameHandler = (username) => {
    setUsername(username);
  };

  const scoreHandler = (bonus) => {
    if (bonus) setScore(score + answerScore);
  };

  return (
    <PlayContext.Provider
      value={{
        isValidation: isValidation,
        isLoggedIn: isLoggedIn,
        isPlaying: isPlaying,
        isCorrect: isCorrect,
        answer: answer,
        answerScore: answerScore,
        username: username,
        score: score,
        onLogin: loginHandler,
        onValidation: validationHandler,
        onAnswer: answerHandler,
        onUsername: usernameHandler,
        onScore: scoreHandler,
        url: url,
      }}
    >
      <Switch>
        <Route exact path={path} component={PassCodeScreen} />
        <ProtectedRoute
          path={`${path}/join`}
          component={LoginScreen}
          isAuthentication={isValidation}
          redirect={url}
        />
        <ProtectedRoute
          path={`${path}/instruction`}
          component={WaitScreen}
          isAuthentication={isLoggedIn}
          redirect={`${url}/join`}
        />
        <ProtectedRoute
          path={`${path}/gameblock`}
          component={PlayScreen}
          isAuthentication={isPlaying}
          redirect={`${url}/instruction`}
        />
        <ProtectedRoute
          path={`${path}/result`}
          component={ResultScreen}
          isAuthentication={true}
          redirect={`${url}/gameblock`}
        />
      </Switch>
    </PlayContext.Provider>
  );
}

export default PlayGameScreen;
