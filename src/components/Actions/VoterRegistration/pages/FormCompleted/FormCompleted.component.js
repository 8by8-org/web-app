import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../../../contexts/AuthContext";

import "../../VoterRegistration.scss";
<<<<<<< HEAD:src/components/Actions/VoterRegistration/pages/FormCompleted/FormCompleted.component.js
import ScrollToTop from "../../../../../functions/ScrollToTop";
=======
import ScrollToTop from "../../../../functions/ScrollToTop";
import MetaTags from 'react-meta-tags';
>>>>>>> 0ae281d19ec71fc1ea157a19c9ae493d20e1c524:src/components/VoterRegistration/pages/FormCompleted/FormCompleted.component.js

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
      <MetaTags>
        <meta
          name="description"
          content="8by8 Challenge App, made by 8by8.us with ❤️ "
        />
        <title>8by8</title>
      </MetaTags>
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
