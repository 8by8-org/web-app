
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import errorMessage from "../errorMessage";
import { useHistory } from "react-router-dom";
import cryptoRandomString from 'crypto-random-string';
import { Button, Form } from "react-bootstrap";
import "./LoginPage.css";
const workingUrl = 'localhost:3000';
export default function Login() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [emailVisible] = useState(true);
  const [buttonMessage, setButtonMessage] = useState(" "); // leave blank to hide button

  const emailRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    if (currentUser) {
      history.push("/challenge");
      return;
    }
    if (!auth.isSignInWithEmailLink(auth.getAuth(), window.location.href)) {
      // login step 1
      setButtonMessage("Take the challenge");
      setMessage("Join now and #StopAsianHate at the ballot box.");
      buttonRef.current.onclick = async function () {
      const email = emailRef.current.value;
      const createUser = async (email) => {
          try {
            // CryptoRandomString generates a random hash for the password (because it has no use right now)
            await auth.createUserWithEmailAndPassword(auth.getAuth(), email, cryptoRandomString({length: 20})); 
          } catch (e) {
            console.log(e);
            setError(errorMessage(e));
          }
      };
          if (!email ) {
              setMessage("Missing email");
          } else {
              createUser(email);
              window.location.href = `${workingUrl}/login`
          }
      };
    } 
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <>
      <div className="content d-flex justify-content-center montserrat p-3 flex-column">
        {message && <Form.Label>{message}</Form.Label>}
        {error && <p className="error-col">{error}</p>}
        <br />
        <Form className="d-flex flex-column">
          {emailVisible && (
            <div className="">
              <Form.Control
                className="montserrat input mb-3 p-2"
                type="email"
                placeholder="Email:"
                ref={emailRef}
              ></Form.Control>
          </div>
          )}
          {buttonMessage && (
            <Button className="p-2" variant="secondary" ref={buttonRef}>
              {buttonMessage}
            </Button>
          )}
          {buttonMessage && (<p>
            Already have an account? <></>
            <a href="/login">
              Log In
            </a></p>
          )}
          
        </Form>
        
      </div>
    </>
  );
}
