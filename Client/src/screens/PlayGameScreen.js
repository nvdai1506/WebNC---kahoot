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
  useHistory,
} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import GetReadyScreen from "./GameScreens/GetReadyScreen";

import { io } from "socket.io-client";
let socket;

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
  const history = useHistory();


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

  const [pin, setPin] = useState();
  const [playerId, setPlayerId] = useState();

  useEffect(()=>{
    console.log('Playgame mounted');

    return () => {
      if (socket) {
        socket.close();
      }
    }
  },[])

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


  function ioJoinRoom(value) {
    setPin(value);

    socket = io("localhost:3001");
    socket.on("connect", () => {
      console.log('Connect socket server success.', socket.id); 
      setPlayerId(socket.id);

      socket.emit('player-join', {pin: value})

      history.push(`${url}/join`);

    });
  }

  function ioAddPlayer(data) {
    socket.emit('player-add', data);
    ioOnNextQuestion();
    history.push(`${url}/instruction`);
  }

  function ioOnNextQuestion() {
    console.log('on question', socket);
    socket.io.on('question-start', (data) => {
      console.log(data);
      history.push(`${url}/gameblock`)
    })
  }

  const loginHandler = (obj) => {
    if (obj.isValid) {
      localStorage.setItem("isLoggedIn", "1");
      setIsLoggedIn(true);
      setUsername(obj.value);
      
      ioAddPlayer({pin: pin, name: obj.value, id: playerId});
    }
  };

  const validationHandler = (obj) => {

    if (obj.isValid) {
      localStorage.setItem("isValidation", "1");
      setIsValidation(true);
      ioJoinRoom(obj.value);
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
