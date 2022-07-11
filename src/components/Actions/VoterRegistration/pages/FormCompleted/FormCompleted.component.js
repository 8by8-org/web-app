import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../../../contexts/AuthContext";

import "../../VoterRegistration.scss";
import ScrollToTop from "../../../../../functions/ScrollToTop";

export const FormCompleted = () => {
  const history = useHistory();
  const { currentUserData } = useAuth();
  let redirect = "/progress";
  if (currentUserData && currentUserData.invitedBy.length > 0) {
    redirect = "/actions";
  }

  ScrollToTop();

  return (
    <form className="voterRegForm">
      <h1 className="register-form-title">
        <u className="underline">YOU COMPLETED</u><br />
        THE FORM
      </h1>
      <p className="register-form-text">
        We've emailed you a PDF of your completed form. You can print it out and
        mail it to your state to complete your voter registration.
      </p>
      <button
        className="next-btn"
        onClick={(e) => {
          e.preventDefault();
          history.push(redirect);
        }}
      >
        GO BACK TO THE CHALLENGE
      </button>
    </form>
  );
};
