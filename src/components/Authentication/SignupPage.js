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
import { getFunctions, httpsCallable } from "firebase/functions";
import "./SignupPage.scss";
const db = getFirestore();

export default function SignupPage() {
  const { currentUser } = useAuth();
  const history = useHistory();

  const functions = getFunctions();
  const verifyReCaptcha = httpsCallable(functions, "verifyReCaptcha");

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
      setButtonMessage("Submit");
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
            // waiting a few seconds for user doc to be created before adding data
            await setTimeout(() => {
              addUserToDB(username, avatarNum);
            }, 3000); // blame this if username & avatar aren't stored
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
    <div className="signup">
      <p className="normal-title">Sign up</p>
      <p className="no-underline-title">to start your 8by8 journey</p>

      <Form className="form">
        {error && <p className="error">{error}</p>}
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
            <Form.Control
              className="text-input"
              type="email"
              placeholder="Email address*"
              ref={emailRef}
            ></Form.Control>
            <Form.Control
              className="text-input"
              type="email"
              placeholder="Re-enter Email address*"
              ref={confirmEmailRef}
            ></Form.Control>
            <p className="small-title">Which One's you? </p>
            <div className="avatar-container">
              {/* avatar 1 */}
              <input checked={preselect} type="radio" name="avatar" id="1" />
              <label htmlFor="1">
                <img className="avatar-img" src={avatar1} alt="avatar1" />
              </label>

              {/* avatar 2 */}
              <input
                onClick={() => {
                  setPreselect(null);
                }}
                type="radio"
                name="avatar"
                id="2"
              />
              <label htmlFor="2">
                <img className="avatar-img" src={avatar2} alt="avatar2" />
              </label>
              <br />

              {/* avatar 3 */}
              <input
                onClick={() => {
                  setPreselect(null);
                }}
                type="radio"
                name="avatar"
                id="3"
              />
              <label htmlFor="3">
                <img className="avatar-img" src={avatar3} alt="avatar3" />
              </label>

              {/* avatar 4 */}
              <input
                onClick={() => {
                  setPreselect(null);
                }}
                type="radio"
                name="avatar"
                id="4"
              />
              <label htmlFor="4">
                <img className="avatar-img" src={avatar4} alt="avatar4" />
              </label>
            </div>
          </>
        )}

        <div className="recaptcha">
          <ReCAPTCHA
            sitekey="6LcVtjIeAAAAAEmNoh6l54YbfW8QoPm68aI8VJey"
            // need to add server recaptcha check
            // onChange={async (response) => {
            //   await verifyReCaptcha({ response_key: response })
            //     .then((result) => {
            //       console.log(result);
            //     })
            //     .catch((error) => {
            //       console.log(error);
            //     });
            // }}
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
          By clicking on Continue, I agree to the &#160;
          <a onClick={() => history.push("/termsofservice")} className="link">
            Terms of Service
          </a>{" "}
          and the{" "}
          <a href="#" className="link">
            Privacy Policy
          </a>
        </p>

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
          <p class="signin small-text">
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
