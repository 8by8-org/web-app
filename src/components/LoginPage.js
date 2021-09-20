/**
 * login with email link also includes sign up.
 * login flow:
 *   step 1: user puts in email and clicks "Get login link"
 *           page shows "Check your email for a login link"
 *   step 2: user clicks on the login link in their email
 *           second page logs them in, while the first page is useless now
 */

 import React, { useEffect, useRef, useState } from "react";
 import { useAuth } from "../contexts/AuthContext";
 import { auth } from "../firebase";
 import errorMessage from "../errorMessage";
 import { useHistory } from "react-router-dom";
 import LandingPageInfo from "./LandingPageInfo";
 import { Button, Form } from "react-bootstrap";
 import "./LoginPage.css";
 
 const localStorageEmailKey = "verifyUserEmail";
 
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
     if (!auth.isSignInWithEmailLink(auth.getAuth(), window.location.href)) {
       // login step 1
       setButtonMessage("Take the challenge");
       setMessage("Log in and continue your journey to #StopAsianHate at the ballot box.");
       buttonRef.current.onclick = async function () {
         const email = emailRef.current.value;
         const emailLogin = async email => {
           try {
             await auth.sendSignInLinkToEmail(auth.getAuth(), email, {
               url: `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
               handleCodeInApp: true,
             });
             window.localStorage.setItem(localStorageEmailKey, email);
             setEmailVisible(false);
             setButtonMessage(null);
             setMessage("Check your email for an email login link");
           } catch(e) {
             setError(errorMessage(e));
           }
         }
         const loginTest = async (email) => {
           try {
             await emailLogin(email);
           } catch (e) {
             console.log(e)
             setError(errorMessage(e));
           }
         };
         if (!email) {
           setMessage("Missing email");
         }
         else {
           emailLogin(email);
           setMessage("Check your email for your login link!");
         }
       };
     } else {
       // login step 2
       const verifyEmail = async (email) => {
         try {
           await auth.signInWithEmailLink(auth.getAuth(), email, window.location.href);
         } catch (e) {
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
     <>
       <div className="content d-grid justify-content-center montserrat p-3">
         <Form className="d-grid">
           {message && <Form.Label>{message}</Form.Label>}
           {error && <p className="error-col">{error}</p>}
           {emailVisible && (
             <div>
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
           {buttonMessage && (
             <a href="/signup" className="btn btn-secondary mt-3">
               Sign Up
             </a>
           )}
           
         </Form>
         
       </div>
     </>
   );
 }