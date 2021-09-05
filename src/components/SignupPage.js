
 import React, { useEffect, useRef, useState } from "react";
 import { useAuth } from "../contexts/AuthContext";
 import { auth } from "../firebase";
 import errorMessage from "../errorMessage";
 import { useHistory } from "react-router-dom";
 import LandingPageInfo from "./LandingPageInfo";
 import { Button, Form } from "react-bootstrap";
 import "./LoginPage.css";
 
 const localStorageEmailKey = "verifyUserEmail";
 const workingUrl = 'localhost:3000';
 export default function Login() {
   const { currentUser } = useAuth();
   const history = useHistory();
   const [error, setError] = useState(null);
   const [message, setMessage] = useState(null);
   const [emailVisible, setEmailVisible] = useState(true);
   const [buttonMessage, setButtonMessage] = useState(" "); // leave blank to hide button
 
   const emailRef = useRef();
   const buttonRef = useRef();
   const passwordRef = useRef();
 
   useEffect(() => {
     if (currentUser) {
       history.push("/challenge");
       return;
     }
     if (!auth.isSignInWithEmailLink(window.location.href)) {
       // login step 1
       setButtonMessage("Take the challenge");
       setMessage("Join now and #StopAsianHate at the ballot box.");
       buttonRef.current.onclick = async function () {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const createUser = async (email) => {
            try {
                await auth.createUserWithEmailAndPassword(email, password);
            } catch (e) {
                console.log(e);
                setError(errorMessage(e));
            }
        };
            if (!email || !password) {
                setMessage("Missing email or password");
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
      <LandingPageInfo />
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
              <Form.Control
              className="montserrat input mb-3 p-2"
              type="password"
              placeholder="Password:"
              ref={passwordRef}
            ></Form.Control>
          </div>
          )}
          {buttonMessage && (
            <Button className="p-2" variant="secondary" ref={buttonRef}>
              {buttonMessage}
            </Button>
          )}
          {buttonMessage && (
            <a href="/login" className="btn btn-secondary mt-3">
              Log In
            </a>
          )}
          
        </Form>
        
      </div>
    </>
  );
 }
 