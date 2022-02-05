import React from "react";
import "../../VoterRegistration.scss";

export const FormCompleted = () => {
  return (
    <>
      <h1 className="title">
        <span className="underline">YOU COMPLETE</span>D THE FORM!
      </h1>
      <p>
        To complete the full process with your state, please go to the [Your
        State Here] Website.
      </p>
      <button className="btn">CONTINUE TO STATE WEBSITE</button>
      <p>
        Or, we can email you a PDF of your completed form. You can print it out
        and mail it to your state to complete your voter registration. Get email
        with PDF form
      </p>
    </>
  );
};
