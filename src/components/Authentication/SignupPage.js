import { useRef, useEffect, useState } from "react";
import { useAuth } from "./../../contexts/AuthContext";
import { auth } from "./../../firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import errorMessage from "./../../errorMessage";
import { useHistory } from "react-router-dom";
import { dummyPassword } from "./constants";
import { Button, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import "./Signin.scss";

const workingUrl = "localhost:3000";
const db = getFirestore();

export default function Login() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [emailVisible] = useState(true);
  const [buttonMessage, setButtonMessage] = useState(" "); // leave blank to hide button
  const [reCaptchaPassed, setReCaptchaPassed] = useState(false);
  const [preselect, setPreselect] = useState(true);

  const emailRef = useRef();
  const buttonRef = useRef();
  const avatarRef = useRef();
  const playerStatus = localStorage.getItem("player");

  useEffect(() => {
    if (currentUser) {
      history.push("/progress");
      return;
    }

    if (currentUser && playerStatus === "voter") {
      localStorage.removeItem("player");
      history.push("/voterreg");
      return;
    }

    if (currentUser && playerStatus === "reminder") {
      localStorage.removeItem("player");
      history.push("/electionreminder");
      return;
    }

    if (currentUser && !playerStatus) {
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
          let userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            avatar,
          });
        };
        const createUser = async (email) => {
          try {
            // CryptoRandomString generates a random hash for the password (because it has no use right now)
            await auth.createUserWithEmailAndPassword(
              auth.getAuth(),
              email,
              dummyPassword
            );
            await addAvatarToDB();
          } catch (e) {
            console.log(e);
            setError(errorMessage(e));
          }
        };
        if (!email) {
          setMessage("Missing email");
        } else {
          createUser(email);
          window.location.href = `${workingUrl}/login`;
        }
      };
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <>
      <div className="signin p-3">
        <Form className="d-grid signin-form">
          <p className="signup-text">
            <span class="signup-header">Sign up</span>
            <br />
            to start your 8by8 journey
          </p>
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
              <div className="avatar-container">
                <input
                  checked={preselect}
                  type="radio"
                  id="0"
                  name="avatar"
                  value="0"
                  ref={avatarRef}
                />
                <label htmlFor="0">
                  <div className="avatar">
                    <img
                      className="avatar-img"
                      src={process.env.PUBLIC_URL + "/avatars/avatar1.png"}
                      alt=""
                    />
                  </div>
                </label>
                <input
                  onClick={() => setPreselect(null)}
                  type="radio"
                  id="1"
                  name="avatar"
                  value="1"
                  ref={avatarRef}
                />
                <label htmlFor="1">
                  <div className="avatar">
                    <img
                      className="avatar-img"
                      src={process.env.PUBLIC_URL + "/avatars/avatar2.png"}
                      alt=""
                    />
                  </div>
                </label>
                <br />
                <input
                  onClick={() => setPreselect(null)}
                  type="radio"
                  id="2"
                  name="avatar"
                  value="2"
                  ref={avatarRef}
                />
                <label htmlFor="2">
                  <div className="avatar">
                    <img
                      className="avatar-img"
                      src={process.env.PUBLIC_URL + "/avatars/avatar3.png"}
                      alt=""
                    />
                  </div>
                </label>
                <input
                  onClick={() => setPreselect(null)}
                  type="radio"
                  id="3"
                  name="avatar"
                  value="3"
                  ref={avatarRef}
                />
                <label htmlFor="3">
                  <div className="avatar">
                    <img
                      className="avatar-img"
                      src={process.env.PUBLIC_URL + "/avatars/avatar4.png"}
                      alt=""
                    />
                  </div>
                </label>
              </div>
            </div>
          )}
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

          {buttonMessage && (
            <Button
              className="button"
              ref={buttonRef}
              disabled={!reCaptchaPassed}
            >
              {buttonMessage}
            </Button>
          )}
          {buttonMessage && (
            <p class="signin-link">
              Have an account? <> </>
              <a href="/signin" style={{ style: "inline" }}>
                Sign In
              </a>
            </p>
          )}
        </Form>
      </div>
    </>
  );
}
