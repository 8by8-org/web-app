import React, { useEffect, useState } from "react";
import { useAuth } from "./../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import Plane from "./../../../assets/4-pages/Verify/Plane.png";
import "./Verify.scss";

function Verify() {
  const { currentUser, currentUserData } = useAuth();
  const history = useHistory();
  const functions = getFunctions();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (currentUser?.emailVerified) {
      history.push(`/verifysuccess`);
    }
    setEmail(currentUserData?.email);
  }, [currentUser]);

  const resendVerification = httpsCallable(functions, "resendVerification");
  const resendEmailVerification = () => {
    resendVerification({ email: email });
  };

  return (
    <div className="verify">
      <h1 className="underline">Verify Your Email</h1>
      <p>
        We just emailed you at {email}. Tap on the "Verify Now" button in your
        email to continue!
      </p>
      <img src={Plane} height={175} />
      <p>The email may take a few moments to arrive.</p>
      <p className="resend b6">
        Didn't receive the email?{" "}
        <span className="button b5" onClick={() => resendEmailVerification()}>
          Get another email
        </span>
      </p>
    </div>
  );
}

export default Verify;
