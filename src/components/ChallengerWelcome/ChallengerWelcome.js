import React from "react";
import { useHistory } from "react-router-dom";
import "./ChallengerWelcome.scss";
import Top from "./../../assets/images/ChallengerWelcome/Top.png";
import Logo from "./../../assets/logos/white-logo.svg";
import StepOne from "./../../assets/images/ChallengerWelcome/StepOne.png";
import StepTwo from "./../../assets/images/ChallengerWelcome/StepTwo.png";
import StepThree from "./../../assets/images/ChallengerWelcome/StepThree.png";
import StepFour from "./../../assets/images/ChallengerWelcome/StepFour.png";

function ChallengerWelcome() {
  const history = useHistory();
  sessionStorage.setItem("UserType", "Challenger");

  return (
    <div className="challenger-welcome">
      <div className="content-1">
        <img className="background" src={Top} alt="background" />
        <div className="container">
          <img className="logo" src={Logo} alt="8by8 Logo" />
        </div>
      </div>

      <div className="content-2">
        <div className="normal-title">Welcome!</div>
        <p className="normal-text">
          Closing the voter registration gap has to be a community effort, so
          we're asking everyone to join us in taking the #8by8Challenge—register
          8 friends to register to vote in 8 days!
        </p>
        <button
          onClick={() => history.push("/signup")}
          className="gradient-button"
        >
          Get Started
        </button>
        <p className="small-text">
          Already have an account?{" "}
          <span className="link" onClick={() => history.push("/signin")}>
            Sign in
          </span>
        </p>
      </div>

      <div className="content-3">
        <div className="small-title">Here's How it Works</div>

        <div className="normal-heading">1. Sign Up</div>
        <p className="normal-text">
          Sign up with your name and email address to get started.
        </p>
        <img src={StepOne} alt="sign up" className="center-img" />

        <div className="normal-heading">2. Invite your friends</div>
        <p className="normal-text">
          Get 8 friends via social media or messaging apps to join your
          challenge.
        </p>
        <img src={StepTwo} alt="invite your friends" className="center-img" />

        <div className="normal-heading">3. Friends take action</div>
        <p className="normal-text">
          Your friends can support your challenge by taking 1 of 3 actions:
          register to vote, set up election reminders, or take the challenge
          themselves. You’ll earn 1 badge per friend who takes action!
        </p>
        <img src={StepThree} alt="friends take action" className="center-img" />

        <div className="normal-heading">4. Earn 8 badges in 8 days</div>
        <p className="normal-text">
          When you get 8 badges in 8 days, you win the challenge! Most
          importantly, you helped the community move closer to greater AAPI
          representation!
        </p>
        <img
          src={StepFour}
          alt="earn 8 badges in 8 days"
          className="center-img"
        />

        <button
          onClick={() => history.push("/signup")}
          className="gradient-button"
        >
          Get Started
        </button>
        <p className="small-text">
          Already have an account?{" "}
          <span className="link" onClick={() => history.push("/signin")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default ChallengerWelcome;
