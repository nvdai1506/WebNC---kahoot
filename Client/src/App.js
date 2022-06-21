import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import { useEffect } from "react";

import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import CreateGameScreen from "./screens/CreateGameScreen";
import DeployGameScreen from "./screens/DeployGameScreen";
import WaitScreen from "./screens/WaitScreen";
import PlayScreen from "./screens/PlayScreen";
import { IconContext } from "react-icons";

function App() {
  useEffect(() => {
    if (!localStorage._privateKey && window.location.pathname !== "/create") {
      window.location.replace("/create");
    }
  }, []);
  return (
    <IconContext.Provider value={{ size: "3em", color: "white" }}>
      <AppProvider>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Switch>
                <Route path="/deploy" component={DeployGameScreen} />
                <Route path="/create" component={CreateGameScreen} />
                <Route path="/play" component={PlayScreen} />
                <Route path="/" component={HomeScreen} />
              </Switch>
            </div>
          </div>
        </Router>
      </AppProvider>
    </IconContext.Provider>
  );
}

export default App;
