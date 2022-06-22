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
} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

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

  const loginHandler = (isValid) => {
    if (isValid) {
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

  return (
    <PlayContext.Provider
      value={{
        isValidation: isValidation,
        isLoggedIn: isLoggedIn,
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
        <Route exact path={path} component={PassCodeScreen} />
        <ProtectedRoute
          path={`${path}/join`}
          component={LoginScreen}
          isAuthentication={isValidation}
        />
        <ProtectedRoute
          path={`${path}/instruction`}
          component={WaitScreen}
          isAuthentication={isValidation && isLoggedIn}
        />
      </Switch>
    </PlayContext.Provider>
  );
}

export default PlayGameScreen;
