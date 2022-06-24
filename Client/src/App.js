import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Header from "./components/layouts/Header";
import HomeScreen from "./screens/HomeScreen";
import CreateGameScreen from "./screens/CreateGameScreen";
import DeployGameScreen from "./screens/DeployGameScreen";
import PlayGameScreen from "./screens/PlayGameScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { IconContext } from "react-icons";

function App() {

  return (
    <Router>
      <IconContext.Provider value={{ size: "4em", color: "white" }}>
        <AppProvider>
          <div className="App">
            <Header />
            <div className="container vh-100">
              <Switch>
                <Route path="/register" component={RegisterScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/deploy" component={DeployGameScreen} />
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
