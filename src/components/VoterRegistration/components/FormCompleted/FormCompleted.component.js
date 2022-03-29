import React from "react";
import { useHistory } from "react-router";
import "../../VoterRegistration.scss";

export const FormCompleted = () => {
  const history = useHistory();
  return (
    <>
      {/* <p>
        To complete the full process with your state, please go to the [Your
        State Here] Website.
      </p>
      <button className="btn">CONTINUE TO STATE WEBSITE</button> */}
      <p className="register-form-text">
        We've emailed you a PDF of your completed form. You can print it out and
        mail it to your state to complete your voter registration.
      </p>
      <button
        className="next-btn"
        onClick={(e) => {
          e.preventDefault();
          history.push("/challengerwelcome");
        }}
      >
        GO BACK TO THE CHALLENGE
      </button>
    </>
  );
};
