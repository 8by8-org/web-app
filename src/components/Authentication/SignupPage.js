import { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";
import { auth } from "./../../firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import errorMessage from "./../../functions/errorMessage";
import { dummyPassword } from "../../constants";
import { Button, Form } from "react-bootstrap";
import avatar1 from "../../assets/images/SignUpPage/avatar1.png";
import avatar2 from "../../assets/images/SignUpPage/avatar2.png";
import avatar3 from "../../assets/images/SignUpPage/avatar3.png";
import avatar4 from "../../assets/images/SignUpPage/avatar4.png";
import ReCAPTCHA from "react-google-recaptcha";
import { emailUser } from "./../../functions/Email";
import { getUserType } from "./../../functions/UserType";
import "./SignupPage.scss";

export default function SignupPage() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const db = getFirestore();

  const [message, setMessage] = useState(null);
  const [emailVisible] = useState(true);
  const [buttonMessage, setButtonMessage] = useState(" ");
  const [reCaptchaPassed, setReCaptchaPassed] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("avatar1");

  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [duplicateError, setDuplicateError] = useState(null);

  const emailRef = useRef();
  const confirmEmailRef = useRef();
  const buttonRef = useRef();
  const nameRef = useRef();
  const playerStatus = localStorage.getItem("player");

  const changeAvatar = (event) => {
    setSelectedAvatar(event.target.value);
  };

  useEffect(() => {
    if (currentUser) {
      playerStatus
        ? history.push(`/${playerStatus}`)
        : history.push("/progress");
    }

    // signup logic
    if (!auth.isSignInWithEmailLink(auth.getAuth(), window.location.href)) {
      setButtonMessage("Sign Up");
      buttonRef.current.onclick = async function () {
        const email = emailRef.current.value;
        const confirmedEmail = confirmEmailRef.current.value;
        const username = nameRef.current.value;
        const avatarNumber = parseInt(
          document.querySelector('input[name="avatar"]:checked').id
        );
        let challengeEndDate = "";
        let startedChallenge = false;
        // will need to change data if user is not a challenger (is a player)
        if (getUserType() === "player") {
          await setTimeout(() => {
            emailUser(email, "playerWelcome");
          }, 3000);
        } else {
          challengeEndDate = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000); // now + 8 days
          startedChallenge = true;
          await setTimeout(() => {
            emailUser(email, "challengerWelcome");
          }, 3000);
        }

        const addUserToDB = async (name, avatar, endDate, isStarted) => {
          await setTimeout(() => {
            const user = auth.getAuth().currentUser;
            const userRef = doc(db, "users", user.uid);
            updateDoc(userRef, {
              name: name,
              avatar: avatar,
              challengeEndDate: endDate,
              startedChallenge: isStarted,
            });
          }, 3000);
        };

        const createUser = async (email) => {
          try {
            // CryptoRandomString generates a random hash for the password (because it has no use right now)
            await auth.createUserWithEmailAndPassword(
              auth.getAuth(),
              email,
              dummyPassword
            );
            // waiting a few seconds for user doc to be created before adding data
            addUserToDB(
              username,
              avatarNumber,
              challengeEndDate,
              startedChallenge
            );
          } catch (e) {
            const error = errorMessage(e);

            if (error == "Please enter a correct email address.") {
              setEmailError(error);
              setDuplicateError("");
            } else if (error == "This email is already in use.") {
              setEmailError(error);
              setDuplicateError("");
            } else if (error == "Something went wrong. Please try again.") {
              setDuplicateError("");
              setEmailError("");
              setError(error);
            }
          }
        };

        if (!username) {
          setNameError("Please enter your name.");
        } else {
          setNameError("");
        }

        if (!email) {
          setEmailError("Please enter an email address.");
        }

        if (confirmedEmail !== email) {
          setDuplicateError("Emails do not match.");
        }

        if (username && email && confirmedEmail === email) {
          createUser(email);
        }
      };
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <div className="signup">
      <p className="normal-title">Sign up</p>
      <p className="no-underline-title">to start your 8by8 journey</p>

      <Form className="form">
        {message && <p> {message} </p>}
        {emailVisible && (
          <>
            <p className="required-text">*Required information</p>
            <Form.Control
              className="text-input"
              type="text"
              placeholder="Name*"
              ref={nameRef}
            ></Form.Control>
            {nameError && <p className="error-msg">{nameError}</p>}

            <Form.Control
              className="text-input"
              type="email"
              placeholder="Email address*"
              ref={emailRef}
            ></Form.Control>
            {emailError && <p className="error-msg">{emailError}</p>}

            <Form.Control
              className="text-input"
              type="email"
              placeholder="Re-enter Email address*"
              ref={confirmEmailRef}
            ></Form.Control>
            {duplicateError && <p className="error-msg">{duplicateError}</p>}

            <p className="small-title">Which One's you? </p>
            <div className="avatar-container">
              {/* avatar 1 */}
              <input
                checked={selectedAvatar === "avatar1"}
                value="avatar1"
                type="radio"
                name="avatar"
                id={1}
                onChange={changeAvatar}
              />
              <label htmlFor={1}>
                <img className="avatar-img" src={avatar1} alt="avatar1" />
              </label>

              {/* avatar 2 */}
              <input
                checked={selectedAvatar === "avatar2"}
                value="avatar2"
                type="radio"
                name="avatar"
                id={2}
                onChange={changeAvatar}
              />
              <label htmlFor={2}>
                <img className="avatar-img" src={avatar2} alt="avatar2" />
              </label>
              <br />

              {/* avatar 3 */}
              <input
                checked={selectedAvatar === "avatar3"}
                value="avatar3"
                type="radio"
                name="avatar"
                id={3}
                onChange={changeAvatar}
              />
              <label htmlFor={3}>
                <img className="avatar-img" src={avatar3} alt="avatar3" />
              </label>

              {/* avatar 4 */}
              <input
                checked={selectedAvatar === "avatar4"}
                value="avatar4"
                type="radio"
                name="avatar"
                id={4}
                onChange={changeAvatar}
              />
              <label htmlFor={4}>
                <img className="avatar-img" src={avatar4} alt="avatar4" />
              </label>
            </div>
          </>
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

        <p className="tos">
          By signing up, I agree to the &#160;
          <a onClick={() => history.push("/termsofservice")} className="link">
            Terms of Service
          </a>{" "}
          and the{" "}
          <a href="#" className="link">
            Privacy Policy
          </a>
        </p>

        {error && <p className="unknown-error">{error}</p>}
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
          <p className="signin small-text">
            Already have an account?{" "}
            <a href="/signin" className="link">
              Sign In
            </a>
          </p>
        )}
      </Form>
    </div>
  );
}
