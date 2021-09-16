import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Progress.css";

export default function Progress() {
  // Holds 8 by default; will change to days left according to server call
  const [dayCounter, changeDayCounter] = useState(8);
  return (
    <div id="progress-container">
      <div id="navbar"></div>
      <p className="bebas-neue black spacing" id="challenge-badge-header">
        YOUR CHALLENGE BADGES
      </p>
      <div id="day-counter-container">
        <div className="yellow-background"></div>
        <div className="black-background">
          <p className="bebas-neue white" id="day-number">
            {dayCounter}
          </p>
          <p className="lato white spacing" id="days-left">
            days left
          </p>
        </div>
      </div>
      <p className="black" id="thanks-message">
        Thanks for taking the challenge! Invite friends to join your challenge
        to earn badges.
      </p>
      <div className="rows"></div>
      <button className="black spacing" id="invite">
        Invite friends
      </button>
      <p className="black spacing" id="register-message">
        Not registered to vote yet? <a href="placeholder">Register now</a> and
        earn your first badge!
      </p>
    </div>
  );
}
