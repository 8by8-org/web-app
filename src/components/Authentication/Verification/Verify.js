import { getFunctions, httpsCallable } from "firebase/functions";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PopupModal from "../../Utility/PopupModal/PopupModal";
import Plane from "./../../../assets/4-pages/Verify/Plane.png";
import { useAuth } from "./../../../contexts/AuthContext";
import "./Verify.scss";

function Verify() {
  const { currentUser, currentUserData } = useAuth();
  const history = useHistory();
  const functions = getFunctions();
  const [email, setEmail] = useState();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (currentUser?.emailVerified) {
      history.push(`/verifysuccess`);
    } else if (currentUser?.email) {
      setEmail(currentUserData?.email);
    } else if (localStorage.getItem("emailForSignIn")) {
      setEmail(localStorage.getItem("emailForSignIn"));
    } else {
      history.push(`/`);
    }
    window.localStorage.setItem("verifying", "true");
  }, [currentUser, history, currentUserData?.email]);

  const resendVerification = httpsCallable(functions, "resendVerification");
  const sendSignin = httpsCallable(functions, "sendSigninEmail");

  const resendEmailVerification = () => {
    if (currentUser) {
      resendVerification(currentUser.email).catch((error) => {
        if(error) {
          console.log("Problem re-sending verification email.");
          console.log(error);
          console.log(error.message);
        }
      });
    } else {
      sendSignin(email).catch((error) => {
        if(error) {
          console.log("Problem re-sending sign in email.");
          console.log(error);
          console.log(error.message);
        }
      });
    }
  };

  return (
    <div className="verify">
      <h1 className="underline">Verify Your Email</h1>
      <p>
        We just emailed you at {email}. Tap on the "Verify Now" button in your
        email to continue!
      </p>
      <img src={Plane} height={175} alt="Paper Airplane" />
      <p>The email may take a few moments to arrive.</p>
      <p className="resend b6">
        Didn't receive the email?{" "}
        <span
          className="button b5"
          onClick={() => {
            resendEmailVerification();
            setOpenModal(true);
          }}
        >
          Get another email
        </span>
      </p>
      {openModal && (
        <PopupModal
          setOpenModal={setOpenModal}
          theme={"modalContainer--light"}
          content={
            <>
              <div>We sent you another email at {email}!</div>
              <button className="gradient" onClick={() => setOpenModal(false)}>
                OK
              </button>
            </>
          }
        ></PopupModal>
      )}
    </div>
  );
}

export default Verify;
