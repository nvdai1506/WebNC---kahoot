import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import { useEffect } from "react";

import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import CreateGameScreen from "./screens/CreateGameScreen";
import DeployGameScreen from "./screens/DeployGameScreen";
import PlayGameScreen from "./screens/PlayGameScreen";
import { IconContext } from "react-icons";

function App() {
  useEffect(() => {
    if (!localStorage._privateKey && window.location.pathname !== "/create") {
      window.location.replace("/create");
    }
  }, []);
  return (
<<<<<<< HEAD
    <AppProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="main">
            <Switch>
              <Route path="/deploy" component={DeployGameScreen} />
              <Route path="/create" component={CreateGameScreen} />
              <Route path="/play" component={PlayGameScreen} />
              <Route path="/" component={HomeScreen} />
            </Switch>
=======
    <IconContext.Provider value={{ size: "3em", color: "white" }}>
      <AppProvider>
        <Router>
          <div className="App">
            <Header />
            <div className="container vh-100">
              <Switch>
                <Route path="/deploy" component={DeployGameScreen} />
                <Route path="/create" component={CreateGameScreen} />
                <Route path="/play" component={PlayGameScreen} />
                <Route path="/" component={HomeScreen} />
              </Switch>
            </div>
>>>>>>> cdaea794e71619fa9112c3c8df09d367c3c62604
          </div>
        </Router>
      </AppProvider>
    </IconContext.Provider>
  );
}

export default App;
