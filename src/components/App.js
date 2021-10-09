import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import ChallengePage from "./ChallengePage/ChallengePage";
import Signin from "./Authentication/Signin";
import Logout from "./Authentication/Signout";
import Signup from './Authentication/SignupPage'
import Header from "./Header/Header";
import "./App.css";
import HomePage from "./HomePage/HomePage";
import ChallengerWelcome from "./ChallengerWelcome/ChallengerWelcome";

function App() {
  return (
    <>
      <AuthProvider>
        <div id="header">
          <Header />
        </div>
        <div id="app-outer-wrapper">
          <div id="app-wrapper">
            <Router>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/homepage" />
                </Route>
                <Route path="/homepage" component={HomePage} />
                <Route
                  path="/challengerwelcome"
                  component={ChallengerWelcome}
                />
                <Route path="/signin" component={Signin} />
                <Route path="/challenge" component={ChallengePage} />
                <Route path="/logout" component={Logout} />
                <Route path="/signup" component={Signup} />
              </Switch>
            </Router>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;