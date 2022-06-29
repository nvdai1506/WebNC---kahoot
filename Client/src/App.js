import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Header from "./components/layouts/Header";
import HomeScreen from "./screens/HomeScreen";
import CreateGameScreen from "./screens/CreateGameScreen";
import HostGameScreen from "./screens/HostGameScreen";
import PlayGameScreen from "./screens/PlayGameScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HostStartScreen from "./screens/host-game/HostStartScreen";
import { IconContext } from "react-icons";

function App() {

  return (
    <Router>
      <IconContext.Provider value={{ size: "4em", color: "white" }}>
        <AppProvider>
          <div className="App">
            <Header />
            <div className="app-container">
              <Switch>
                <Route path="/edit/:id" component={CreateGameScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/host/:id" component={HostStartScreen} />
                <Route path="/host" component={HostGameScreen} />
                <Route path="/create" component={CreateGameScreen} />
                <Route path="/play" component={PlayGameScreen} />
                <Route path="/" component={HomeScreen} />
              </Switch>
            </div>
          </div>
        </AppProvider>
      </IconContext.Provider>
    </Router>
  );
}

export default App;
