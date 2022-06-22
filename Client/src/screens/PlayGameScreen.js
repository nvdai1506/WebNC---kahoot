import React, { useState, useEffect } from "react";
import PlayContext from "../context/PlayContext";
import LoginScreen from "./GameScreens/LoginScreen";
import PlayScreen from "./GameScreens/PlayScreen";
import WaitScreen from "./GameScreens/WaitScreen";
import PassCodeScreen from "./GameScreens/PassCodeScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function PlayGameScreen() {
  let { path, url } = useRouteMatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isValidation, setIsValidation] = useState(false);
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

  const loginHandler = (username) => {
    if (username.length > 5) {
      localStorage.setItem("isLoggedIn", "1");
      setIsLoggedIn(true);
      setUsername(username);
    }
  };

  const validationHandler = (passcode) => {
    if (passcode === "123123") {
      localStorage.setItem("isValidation", "1");
      setIsValidation(true);
    }
  };

  return (
    <PlayContext.Provider
      value={{
        isLoggedIn: false,
        username: username,
        score: score,
        onLogin: loginHandler,
        onValidation: validationHandler,
        url: url,
      }}
    >
      {/* {!isValidation && !isLoggedIn && <PassCodeScreen />}
      {isValidation && !isLoggedIn && <LoginScreen />}
      {isValidation && isLoggedIn && <WaitScreen />} */}

      <Switch>
        <Route exact path={path}>
          <PassCodeScreen />
        </Route>
        <Route path={`${path}/:screenId`}>
          <Screen />
        </Route>
      </Switch>
    </PlayContext.Provider>
  );
}

function Screen() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { screenId } = useParams();

  return (
    <>
      {(() => {
        switch (screenId) {
          case "join":
            return <LoginScreen />;
          case "instruction":
            return <WaitScreen />;
          default:
            return null;
        }
      })()}
    </>
  );
}

export default PlayGameScreen;
