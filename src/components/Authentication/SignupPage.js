import { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";
import { auth } from "./../../firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import errorMessage from "./../../errorMessage";
import { dummyPassword } from "../../constants";
import { Button, Form } from "react-bootstrap";
import avatar1 from "../../assets/images/SignUpPage/avatar1.png";
import avatar2 from "../../assets/images/SignUpPage/avatar2.png";
import avatar3 from "../../assets/images/SignUpPage/avatar3.png";
import avatar4 from "../../assets/images/SignUpPage/avatar4.png";
import ReCAPTCHA from "react-google-recaptcha";
import "./Signin.scss";
const db = getFirestore();

export default function SignupPage() {
  const { currentUser } = useAuth();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [emailVisible] = useState(true);
  const [buttonMessage, setButtonMessage] = useState(" ");
  const [reCaptchaPassed, setReCaptchaPassed] = useState(false);
  const [preselect, setPreselect] = useState(true);

  const emailRef = useRef();
  const confirmEmailRef = useRef();
  const buttonRef = useRef();
  const nameRef = useRef();
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

    // signup logic
    if (!auth.isSignInWithEmailLink(auth.getAuth(), window.location.href)) {
      setButtonMessage("Continue");
      buttonRef.current.onclick = async function () {
        const email = emailRef.current.value;
        const confirmedEmail = confirmEmailRef.current.value;
        const username = nameRef.current.value;
        const avatarNum = document.querySelector(
          'input[name="avatar"]:checked'
        ).id;

        const addUserToDB = async (name, avatar) => {
          const user = auth.getAuth().currentUser;
          const userRef = doc(db, "users", user.uid);
          updateDoc(userRef, {
            name: name,
            avatar: avatar,
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
            // waiting for user doc to be created before adding data
            await setTimeout(() => {
              addUserToDB(username, avatarNum);
            }, 2000);
          } catch (e) {
            setError(errorMessage(e));
          }
        };

        if (!email) {
          setError("Please enter an email address");
        } else if (confirmedEmail !== email) {
          setError("Emails do not match");
        } else {
          createUser(email);
          setMessage("Success");
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
                className="form-control name-field"
                type="text"
                placeholder="Name: "
                ref={nameRef}
              ></Form.Control>
              <Form.Control
                className="form-control email-field"
                type="email"
                placeholder="Email:"
                ref={emailRef}
              ></Form.Control>
              <Form.Control
                className="form-control confirm-field"
                type="email"
                placeholder="Confirm Email:"
                ref={confirmEmailRef}
              ></Form.Control>
              <p className="signup-text signup-header">Which One's you? </p>
              <div className="avatar-container">
                <input checked={preselect} type="radio" name="avatar" id="1" />
                <label htmlFor="1">
                  <div className="avatar">
                    <img className="avatar-img" src={avatar1} alt="avatar" />
                  </div>
                </label>
                <input
                  onClick={() => {
                    setPreselect(null);
                  }}
                  type="radio"
                  name="avatar"
                  id="2"
                />
                <label htmlFor="2">
                  <div className="avatar">
                    <img className="avatar-img" src={avatar2} alt="avatar" />
                  </div>
                </label>
                <br />
                <input
                  onClick={() => {
                    setPreselect(null);
                  }}
                  type="radio"
                  name="avatar"
                  id="3"
                />
                <label htmlFor="3">
                  <div className="avatar">
                    <img className="avatar-img" src={avatar3} alt="avatar" />
                  </div>
                </label>
                <input
                  onClick={() => {
                    setPreselect(null);
                  }}
                  type="radio"
                  name="avatar"
                  id="4"
                />
                <label htmlFor="4">
                  <div className="avatar">
                    <img className="avatar-img" src={avatar4} alt="avatar" />
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

          <p className="tos-text">
            By clicking on Continue, I agree to the &#160;
            <a
              onClick={() => history.push("/termsofservice")}
              className="link inline"
            >
              Terms of Service{" "}
            </a>{" "}
            and the &#160;
            <a href="#" className="link inline">
              Privacy Policy
            </a>
          </p>
          <br />
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
