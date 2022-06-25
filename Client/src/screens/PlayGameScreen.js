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
  const [isCorrect, setIsCorrect] = useState(false);
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestion, setTotalQuestion] = useState(ANSWER_DATA.length);

  useEffect (()=>{
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

  const answerScoreHandler = (responseTime) => {
    setAnswerScore(Math.round((1 - responseTime / 30 / 2) * 1000));
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
        isCorrect: isCorrect,
        answer: answer,
        answerScore: answerScore,
        username: username,
        score: score,
        questionNumber: questionNumber,
        totalQuestion: totalQuestion,
        onLogin: loginHandler,
        onValidation: validationHandler,
        onAnswer: answerHandler,
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
