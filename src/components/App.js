import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import ChallengePage from "./ChallengePage";
import Login from "./LoginPage";
import Logout from "./Logout";
import PrivateRoute from "./PrivateRoute";
import Header from "./Header";
import "./App.css";
import HomePage from "./HomePage";

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
                <Route path="/login" component={Login} />
                <PrivateRoute path="/challenge" component={ChallengePage} />
                <PrivateRoute path="/logout" component={Logout} />
              </Switch>
            </Router>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
