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
import errorMessage from "../../errorMessage";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./Signin.scss";
import { dummyPassword } from "./constants";

const localStorageEmailKey = "verifyUserEmail";

export default function Login() {
const { currentUser } = useAuth();
const history = useHistory();
const [error, setError] = useState(null);
const [setMessage] = useState(null);
const [emailVisible, setEmailVisible] = useState(true);
const [buttonMessage, setButtonMessage] = useState(" "); // leave blank to hide button

const emailRef = useRef();
const buttonRef = useRef();
 
   useEffect(() => {
     if (currentUser) {
       history.push("/progress");
       return;
     }
     if (!auth.isSignInWithEmailLink(auth.getAuth(), window.location.href)) {
       // login step 1
       setButtonMessage("Sign In");
       setMessage("Log in and continue your journey to #StopAsianHate at the ballot box.");
       buttonRef.current.onclick = async function () {
         const email = emailRef.current.value;
         const login = async email => {
           try {
             await auth.signInWithEmailAndPassword(auth.getAuth(), email, dummyPassword);
             window.localStorage.setItem(localStorageEmailKey, email);
             setEmailVisible(false);
             setButtonMessage(null);
             setMessage("Logging in...");
           } catch(e) {
             setError(errorMessage(e));
           }
         }
         if (!email) {
           setMessage("Missing email");
         }
         else {
           login(email);
         }
       };
     } else {
       // login step 2
       const verifyEmail = async (email) => {
         try {
           await auth.signInWithEmailLink(auth.getAuth(), email, window.location.href);
         } catch (e) {
           console.dir(e);
           setError(errorMessage(e));
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
       <div className="signin p-3">
         <Form className="d-grid signin-form">
           <p className="form-header">8 <span className="by">by</span> 8</p>
           {error && <p className="error-col">{error}</p>}
           {emailVisible && (
             <div>
               <Form.Control
                 className="form-control"
                 type="email"
                 placeholder="Email:"
                 ref={emailRef}
               ></Form.Control>
           </div>
           )}
           {buttonMessage && (
             <Button className="button" ref={buttonRef}>
               {buttonMessage}
             </Button>
           )}
           {buttonMessage && (
             <p>
             Dont have an account? <> </>
            <a href="/signup" style={{style: 'inline'}}>
              Sign Up
            </a></p>
           )}
           
         </Form>
         
       </div>
   );
 }