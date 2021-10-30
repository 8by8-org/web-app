
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "./../../contexts/AuthContext";
import { auth } from "./../../firebase";
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import errorMessage from "./../../errorMessage";
import AvatarSelect from "./AvatarSelect";
import { useHistory } from "react-router-dom";
import { dummyPassword } from './constants';
import { Button, Form } from "react-bootstrap";
import "./Signin.scss";
const workingUrl = 'localhost:3000';
const db = getFirestore();
export default function Login() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [emailVisible] = useState(true);
  const [buttonMessage, setButtonMessage] = useState(" "); // leave blank to hide button

  const emailRef = useRef();
  const buttonRef = useRef();
  const avatarRef = useRef();

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
        const avatar = avatarRef.current.id;
        console.dir(avatarRef);
        await console.log(avatar);
        const addAvatarToDB = async () => {
          let user = auth.getAuth().currentUser;
          console.log(user.uid); 
          /*await db.collection("users").doc(user.uid).set({
            avatar: Number
          })
          await db.collection("users").doc(user.uid).update({
            "avatar" : avatar
          }) */
          let userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            avatar
          });
        }
        const createUser = async (email) => {
            try {
              // CryptoRandomString generates a random hash for the password (because it has no use right now)
              await auth.createUserWithEmailAndPassword(auth.getAuth(), email, dummyPassword); 
              await addAvatarToDB();
              
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
      <div className="signin p-3">
         <Form className="d-grid signin-form">
           <p className="signup-text"><span class="signup-header">Sign up</span><br />to start your 8by8 journey</p>
           {error && <p className="error-col">{error}</p>}
           {message && <p> {message} </p>}
           {emailVisible && (
             <div>
               <Form.Control 
                className="form-control"
                type="text"
                placeholder="Name: "
                ></Form.Control>
               <Form.Control
                 className="form-control"
                 type="email"
                 placeholder="Email:"
                 ref={emailRef}
               ></Form.Control>
               <p className="signup-text signup-header">Which One's you? </p>
               {/*}
               <AvatarSelect src={process.env.PUBLIC_URL + "/assets/avatar1.png"} id='0' ref={avatarRef}/>
               <AvatarSelect src={process.env.PUBLIC_URL + "/assets/avatar2.png"} id='1' ref={avatarRef}/>
               <AvatarSelect src={process.env.PUBLIC_URL + "/assets/avatar3.png"} id='2' ref={avatarRef}/>
               <AvatarSelect src={process.env.PUBLIC_URL + "/assets/avatar4.png"} id='3' ref={avatarRef}/>
              */}
              <input type="radio" id='0' name="avatar" value='0' ref={avatarRef} />
              <label htmlFor='0'>
                    <div className='avatar'>
                        <img className="avatar-img" src={process.env.PUBLIC_URL + "/assets/avatar1.png"} alt="" />
                    </div>
              </label>
              <input type="radio" id='1' name="avatar" value='1' ref={avatarRef} />
              <label htmlFor='1'>
                  <div className='avatar'>
                      <img className="avatar-img" src={process.env.PUBLIC_URL + "/assets/avatar2.png"} alt="" />
                  </div>
              </label>
              <input type="radio" id='2' name="avatar" value='2' ref={avatarRef} />
              <label htmlFor='2'>
                  <div className='avatar'>
                      <img className="avatar-img" src={process.env.PUBLIC_URL + "/assets/avatar3.png"} alt="" />
                  </div>
              </label>
              <input type="radio" id='3' name="avatar" value='3' ref={avatarRef} />
              <label htmlFor='3'>
                  <div className='avatar'>
                      <img className="avatar-img" src={process.env.PUBLIC_URL + "/assets/avatar4.png"} alt="" />
                  </div>
              </label>
              
           </div>
           )}
           {buttonMessage && (
             <Button className="button" ref={buttonRef}>
               {buttonMessage}
             </Button>
           )}
           {buttonMessage && (
             <p class="signin-link">
             Have an account? <> </>
            <a href="/signin" style={{style: 'inline'}}>
              Sign In
            </a></p>
           )}
           
         </Form>
        </div>
    </>
  );
}
