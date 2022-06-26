import React, { useState, useEffect, useContext } from "react";
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
import { AppContext } from "../context/AppContext";
import GetReadyScreen from "./GameScreens/GetReadyScreen";

const ANSWER_DATA = [
  { question: "fuck you?", answer: "triangle" },
  { question: "fuck you?", answer: "triangle" },
  { question: "fuck you?", answer: "triangle" },
  { question: "fuck you?", answer: "square" },
  { question: "fuck you?", answer: "square" },
  { question: "fuck you?", answer: "diamond" },
  { question: "fuck you?", answer: "diamond" },
  { question: "fuck you?", answer: "circle" },
  { question: "fuck you?", answer: "circle" },
  { question: "fuck you?", answer: "circle" },
];

function PlayGameScreen() {
  let { path, url } = useRouteMatch();

  const { checkLogin } = useContext(AppContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isValidation, setIsValidation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [answer, setAnswer] = useState("triangle");
  const [answerScore, setAnswerScore] = useState(1000);
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestion, setTotalQuestion] = useState(ANSWER_DATA.length);
  const [questionTime, setQuestionTime] = useState(30);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

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

    setAnswer(ANSWER_DATA[questionNumber - 1].answer);
  }, [questionNumber]);

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

  const usernameHandler = (username) => {
    setUsername(username);
  };

  const answerScoreHandler = (responseTime) => {
    setAnswerScore(Math.round((1 - responseTime / questionTime / 2) * 1000));
  };

  const scoreHandler = (bonus) => {
    if (bonus) setScore(score + answerScore);
  };

  const questionHandler = () => {
    setQuestionNumber(questionNumber + 1);
  };

  return (
    <PlayContext.Provider
      value={{
        isValidation: isValidation,
        isLoggedIn: isLoggedIn,
        isPlaying: isPlaying,
        answer: answer,
        answerScore: answerScore,
        username: username,
        score: score,
        questionNumber: questionNumber,
        totalQuestion: totalQuestion,
        questionTime: questionTime,
        onLogin: loginHandler,
        onValidation: validationHandler,
        onAnswerScore: answerScoreHandler,
        onUsername: usernameHandler,
        onScore: scoreHandler,
        onQuestion: questionHandler,
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
          path={`${path}/getready`}
          component={GetReadyScreen}
          isAuthentication={true}
          redirect={`${url}/instruction`}
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
