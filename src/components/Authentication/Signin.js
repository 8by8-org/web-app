/**
 * login with email link also includes sign up.
 * login flow:
 *   step 1: user puts in email and clicks "Get login link"
 *           page shows "Check your email for a login link"
 *   step 2: user clicks on the login link in their email
 *           second page logs them in, while the first page is useless now
 */

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import errorMessage from "./../../functions/errorMessage";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./Signin.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { dummyPassword } from "../../constants";
import voteImg from "./../../assets/4-pages/Signin/Vote.png";
import { getUserDatabase } from "../../functions/UserData";
import { getFunctions, httpsCallable } from "firebase/functions";

const localStorageEmailKey = "verifyUserEmail";

export default function Login() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [buttonMessage, setButtonMessage] = useState(" "); // leave blank to hide button
  const [reCaptchaPassed, setReCaptchaPassed] = useState(false);

  const [emailError, setEmailError] = useState("");

  const emailRef = useRef();
  const buttonRef = useRef();
  const playerStatus = localStorage.getItem("player");

  const functions = getFunctions();

  const sendSignin = httpsCallable(functions, "sendSignin");
  const sendSigninEmail = (userEmail) => {
    sendSignin({ email: userEmail });
  };

  useEffect(() => {
    if (currentUser) {
      if (playerStatus) {
        history.push(`/${playerStatus}`);
      } else {
        getUserDatabase().then((data) => {
          if (
            data &&
            !data.startedChallenge &&
            (localStorage.getItem("challengerInfo") || data.invitedBy)
          ) {
            history.push("/actions");
          } else {
            history.push("/progress");
          }
        });
      }
    }

    if (!auth.isSignInWithEmailLink(auth.getAuth(), window.location.href)) {
      // login step 1
      setButtonMessage("Sign In");
      buttonRef.current.onclick = async function () {
        const email = emailRef.current.value;
        // const login = async (email) => {
        //   try {
        //     await auth.signInWithEmailAndPassword(
        //       auth.getAuth(),
        //       email,
        //       dummyPassword
        //     );
        //     window.localStorage.setItem(localStorageEmailKey, email);
        //     setButtonMessage(null);
        //     setMessage("Logging in...");
        //   } catch (e) {
        //     setEmailError(errorMessage(e));
        //   }
        // };
        if (!email) {
          setEmailError("Please enter your email.");
        } else {
          // login(email);
          sendSigninEmail(email);
          history.push(`/verify`);
        }
      };
    } else {
      // login step 2
      const verifyEmail = async (email) => {
        try {
          await auth.signInWithEmailLink(
            auth.getAuth(),
            email,
            window.location.href
          );
        } catch (e) {
          console.dir(e);
          setEmailError(errorMessage(e));
        }
      };

      const storedEmail = window.localStorage.getItem(localStorageEmailKey);
      if (!storedEmail) {
        setMessage("Please re-enter your email");
        setButtonMessage("Verify email");
        buttonRef.current.onclick = () => verifyEmail(emailRef.current.value);
      } else {
        verifyEmail(storedEmail);
      }
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <div className="signin">
      <p className="no-underline-title">
        Welcome <br /> back!
      </p>

      <div className="img">
        <img className="vote-img" src={voteImg} alt="Signin Vote" />
      </div>

      <Form className="form">
        <Form.Control
          className="text-input"
          type="email"
          placeholder="Email address*"
          ref={emailRef}
        ></Form.Control>
        {emailError && <p className="error-msg">{emailError}</p>}

        <div className="recaptcha">
          <ReCAPTCHA
            sitekey="6LcVtjIeAAAAAEmNoh6l54YbfW8QoPm68aI8VJey"
            onChange={() => {
              setReCaptchaPassed(true);
            }}
            onExpired={() => {
              setReCaptchaPassed(false);
            }}
            onErrored={() => {
              setReCaptchaPassed(false);
            }}
          />
        </div>

        {message && <p> {message} </p>}

        {buttonMessage && (
          <Button
            className="gradient-button"
            ref={buttonRef}
            disabled={!reCaptchaPassed}
          >
            {buttonMessage}
          </Button>
        )}

        {buttonMessage && (
          <p className="signup-link">
            New to 8by8? <> </>
            <a href="/signup" style={{ style: "inline" }}>
              Sign Up
            </a>
          </p>
        )}
      </Form>
    </div>
  );
}
