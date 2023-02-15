import React, {useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ScrollToTop from "../functions/ScrollToTop";
import { AuthProvider } from "../contexts/AuthContext";
import { PartnersContextProvider } from "../contexts/PartnersContext";
import Signin from "./Authentication/Signin";
import Signout from "./Authentication/Signout";
import Signup from "./Authentication/Signup";
import Verify from "./Authentication/Verification/Verify";
import SigninVerify from "./Authentication/Verification/SigninVerify";
import VerifySuccess from "./Authentication/Verification/VerifySuccess";
import PrivateRoute from "./Utility/Helpers/PrivateRoute";
import Header from "./Landing/Header/Header";
import "./App.css";
import HomePage from "./Landing/HomePage/HomePage";
import Progress from "./Challenge/Progress/Progress";
import Why8by8 from "./Landing/Why8by8/Why8by8";
import ChallengerWelcome from "./Challenge/ChallengerWelcome/ChallengerWelcome";
import ElectionReminder from "./Actions/ElectionReminders/ElectionReminder";
import Footer from "./Landing/Footer/Footer";
import PlayerWelcome from "./Landing/PlayerWelcome/PlayerWelcome";
import Actions from "./Actions/Actions";
import TOS from "./Landing/Legal/TOS";
import PrivacyPolicy from "./Landing/Legal/PrivacyPolicy";
//Voter Registration Pages
import { Eligibility } from "./Actions/VoterRegistration/pages/Eligibility/Eligibility.component";
import { YourName } from "./Actions/VoterRegistration/pages/YourName/YourName.component";
import { HomeAddress } from "./Actions/VoterRegistration/pages/HomeAddress/HomeAddress.component";
import { OtherInfo } from "./Actions/VoterRegistration/pages/OtherInfo/OtherInfo.component";
import { FormCompleted } from "./Actions/VoterRegistration/pages/FormCompleted/FormCompleted.component";
import Rewards from "./Rewards/Rewards/Rewards";
import ChooseReward from "./Rewards/ChooseReward/ChooseReward";

import ReactGA from 'react-ga4';
const TRACKING_ID = "G-D5X343VVCL"; 
ReactGA.initialize(TRACKING_ID);

export default function App() {

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  }, [])
  
  return (
    <>
      <AuthProvider>
        <PartnersContextProvider>
        <div id="header">
          <Header />
        </div>
        <div id="app-outer-wrapper">
          <div id="app-wrapper">
            <Router>
              <ScrollToTop />
              <Switch>
                <Route exact path="/">
                  <Redirect to="/homepage" />
                </Route>
                <Route path="/homepage" component={HomePage} />
                <Route
                  path="/challengerwelcome"
                  component={ChallengerWelcome}
                />
                <Route path="/why8by8" component={Why8by8} />
                <Route path="/signup" component={Signup} />
                <Route path="/verify" component={Verify} />
                <PrivateRoute path="/verifysuccess" component={VerifySuccess} />
                <Route path="/signin" component={Signin} />
                <Route path="/signinverify" component={SigninVerify} />
                <Route path="/rewards" component={Rewards} />
                <PrivateRoute
                  path="/election-reminders"
                  component={ElectionReminder}
                />
                <PrivateRoute path="/progress" component={Progress} />
                <Route path="/signout" component={Signout} />
                <Route path="/playerwelcome" component={PlayerWelcome} />
                <Route path="/share" component={PlayerWelcome} />
                <Route path="/actions" component={Actions} />
                <PrivateRoute
                  path="/voterreg/eligibility"
                  component={Eligibility}
                />
                <PrivateRoute path="/voterreg/yourname" component={YourName} />
                <PrivateRoute
                  path="/voterreg/homeaddress"
                  component={HomeAddress}
                />
                <PrivateRoute
                  path="/voterreg/otherinfo"
                  component={OtherInfo}
                />
                <PrivateRoute
                  path="/voterreg/completed"
                  component={FormCompleted}
                />
                <PrivateRoute path="/voterreg" component={Eligibility} />
                <PrivateRoute path="/choosereward" component={ChooseReward} />
                <Route path="/termsofservice" component={TOS} />
                <Route path="/privacypolicy" component={PrivacyPolicy} />
              </Switch>
            </Router>
            <Footer />
          </div>
        </div>
        </PartnersContextProvider>
      </AuthProvider>
    </>
  );
}
