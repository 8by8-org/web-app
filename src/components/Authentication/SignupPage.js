
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "./../../contexts/AuthContext";
import { auth } from "./../../firebase";
import errorMessage from "./../../errorMessage";
import { useHistory } from "react-router-dom";
import { dummyPassword } from './constants';
import { Button, Form } from "react-bootstrap";
import "./Signin.scss";
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
      history.push("/progress");
      return;
    }
    if (!auth.isSignInWithEmailLink(auth.getAuth(), window.location.href)) {
      // login step 1
      setButtonMessage("Sign Up");
      buttonRef.current.onclick = async function () {
      const email = emailRef.current.value;
      const createUser = async (email) => {
          try {
            // CryptoRandomString generates a random hash for the password (because it has no use right now)
            await auth.createUserWithEmailAndPassword(auth.getAuth(), email, dummyPassword); 
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
      <div className="p-3 signup">
        
        <br />
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
             Already Have an account? <> </>
            <a href="/signin" style={{style: 'inline'}}>
              Sign in
            </a></p>
           )}
           
         </Form>
        
      </div>
    </>
  );
}
