import React from "react";
import { useHistory } from "react-router-dom";
import "./ChallengerWelcome.scss";
import logo from "../assets/logos/white-logo.svg";

function ChallengerWelcome() {
  const history = useHistory();

  return (
    <div className="challenger-welcome">
      <div className="top">
        <img className="logo" src={logo} alt="logo"></img>
      </div>
      <div className="info">
        <div className="title">WELCOME!</div>
        <div>
          We know that closing the voter registration gap has to be a community
          effort, so we're asking everyone to join us in taking the #8by8
          challenge and registering 8 of their friends, family, or coworkers to
          vote in 8 days.
        </div>
        <button onClick={() => history.push("/signup")}>Sign up</button>
        <div className="login">
          Already have an account?{" "}
          <span className="link" onClick={() => history.push("/login")}>
            Sign in
          </span>
        </div>
        <div className="title">HERE'S HOW IT WORKS</div>
        <ul>
          <ol>1. Sign up</ol>
          <ol>2. Invite your friends</ol>
          <ol>3. Wait for them to take action</ol>
          <ol>4. Complete Challenge</ol>
        </ul>
        <button onClick={() => history.push("/signup")}>Sign up</button>
      </div>
    </div>
  );
}

export default ChallengerWelcome;
