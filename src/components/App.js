import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Signin from './Authentication/Signin'
import Logout from "./Logout";
import PrivateRoute from "./PrivateRoute";
import Header from "./Header";
import "./App.css";
import HomePage from "./HomePage";
import Progress from "./Progress";
import ChallengerWelcome from "./ChallengerWelcome";

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
                <PrivateRoute path="/logout" component={Logout} />
                <PrivateRoute path="/progress" component={Progress} />
              </Switch>
            </Router>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;