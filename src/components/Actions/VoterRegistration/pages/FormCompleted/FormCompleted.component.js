import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../../contexts/AuthContext";
import axios from "axios";
import "../../VoterRegistration.scss";
import ScrollToTop from "../../../../functions/ScrollToTop";
import { clearVoterRegInfo } from "../../utils/UpdateRegInfo";
import { getUserDatabase } from "../../../../functions/UserData";
import { LoadingWheel } from "../../../LoadingWheel/LoadingWheel.component";
const apiUrl = "https://usvotes-6vsnwycl4q-uw.a.run.app";

export const FormCompleted = () => {
  const history = useHistory();
  const { currentUserData, setCurrentUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(currentUserData);
  const [error, setError] = useState("");
  let redirect = "/progress";
  if (currentUserData && currentUserData.invitedBy.length > 0) {
    redirect = "/actions";
  }
  
  useEffect(() => {
    setTimeout(() => {
      getUserDatabase()
      .then((data) => {
        setUserData(data);
      });
      setIsLoading(false);
    }, 1000);
  }, []);
  
  
  ScrollToTop();

  return (
    <form className="voterRegForm">
      <h1 className="register-form-title">
        <u className="underline">YOU COMPLETED</u><br />
        THE FORM
      </h1>
      {isLoading && <LoadingWheel overlay={true} />}
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
      {userData.isRegisteredVoter && userData.voteInfo && Object.keys(userData.voteInfo).length > 0 && (
      <div>
        <h5 className="register-by-mail-title">Or register by mail!</h5>
        <p className="register-by-mail-text">
        We can email you a PDF file of your completed form. 
      We can email you a PDF file of your completed form. 
        We can email you a PDF file of your completed form. 
        Print it out and mail it to your state to complete your voter registration. <a
          onClick={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            axios
              .post(`${apiUrl}/registertovote/`, userData.voteInfo)
              .then((res) => {
                setIsLoading(false);
                setError(
                  ``
                );
              })
              .catch((e) => {
                setIsLoading(false);
                setError(
                  `There was a problem creating your paperwork. ${e.response.data.error}. `
                );
              });
          }}
        >
          Get email with PDF file
        </a>
        </p>
        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
            color: "gray",
            marginTop: "8px",
          }}
        >
        </p>
        {error && <p className="error-message">{error}</p>}
      </div> )}
      {/* <a
        onClick={() => {
          clearVoterRegInfo();
          history.push("/voterreg");
        }}>
          Clear voter registration info
        </a> */}
    </form>
  );
};