import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import { useEffect } from "react";

import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import PlayGameScreen from "./screens/PlayGameScreen";
import CreateGameScreen from "./screens/CreateGameScreen";
import DeployGameScreen from "./screens/DeployGameScreen";


function App() {
  useEffect(() => {
    if (!localStorage._privateKey && window.location.pathname !== "/create") {
      window.location.replace("/create");
    }
  }, []);
  return (
    <AppProvider>
      <Router>
        <div className="App">
			<Header />
			<div className="container">
				<Switch>
					<Route path="/deploy" component={DeployGameScreen} />
					<Route path="/create" component={CreateGameScreen} />
					<Route path="/play" component={PlayGameScreen} />
					<Route path="/" component={HomeScreen} />
				</Switch>
			</div>
        </div>
        
      </Router>
    </AppProvider>
  );
}

export default App;
