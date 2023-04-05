import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import avatar1 from "../../assets/images/SignUpPage/avatar1.png";
import avatar2 from "../../assets/images/SignUpPage/avatar2.png";
import avatar3 from "../../assets/images/SignUpPage/avatar3.png";
import avatar4 from "../../assets/images/SignUpPage/avatar4.png";
import { dummyPassword } from "../../constants";
import { useAuth } from "./../../contexts/AuthContext";
import { auth } from "./../../firebase";
import { getUserType } from "./../../functions/UserType";
import errorMessage from "./../../functions/errorMessage";
import { addUserToDB } from "./AddUserToDB";
import "./Signup.scss";

function Signup() {
  const { currentUser, currentUserData } = useAuth();
  const history = useHistory();
  const playerStatus = localStorage.getItem("player");

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.emailVerified) {
        history.push(`/verify`);
      } else if (playerStatus) {
        history.push(`/${playerStatus}`);
      } else if (currentUserData && !currentUserData.startedChallenge) {
        history.push("/actions");
      } else {
        history.push("/progress");
      }
    }
  }, [currentUser, currentUserData, history, playerStatus]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    avatar: 1,
  });

  const [activeFields, setActiveFields] = useState({
    name: false,
    email: false,
    confirmEmail: false,
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    confirmEmail: "",
  });

  const [reCaptchaPassed, setReCaptchaPassed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    createUser();
  }

  function checkErrors() {
    let errorMsg = {
      name: "",
      email: "",
      confirmEmail: "",
    };
    if (formData.name.length < 1) {
      errorMsg.name = "Please enter your name.";
    }
    if (formData.email.length < 1) {
      errorMsg.email = "Please enter an email address.";
    }
    if (formData.email !== formData.confirmEmail) {
      errorMsg.confirmEmail = "Emails do not match.";
    }
    setError({
      name: errorMsg.name,
      email: errorMsg.email,
      confirmEmail: errorMsg.confirmEmail,
    });
    if (
      (errorMsg.name !== "" && errorMsg.email !== "") ||
      errorMsg.confirmEmail !== ""
    ) {
      return true;
    }
    return false;
  }

  async function createUser() {
    if (
      !auth.isSignInWithEmailLink(auth.getAuth(), window.location.href) &&
      !checkErrors()
    ) {
      let challengeEndDate = "";
      let startedChallenge = false;
      if (getUserType() !== "player") {
        challengeEndDate = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000); // now + 8 days
        startedChallenge = true;
      }
      try {
        // adding user data to database
        await auth.createUserWithEmailAndPassword(
          auth.getAuth(),
          formData.email,
          dummyPassword
        );
        await addUserToDB(
          formData.name,
          formData.avatar,
          challengeEndDate,
          startedChallenge
        );

        window.localStorage.setItem("emailForSignIn", formData.email);
      } catch (e) {
        const errorMsg = errorMessage(e);
        if (errorMsg === "Please enter a correct email address.") {
          setError({
            ...error,
            email: errorMsg,
          });
        } else if (errorMsg === "This email is already in use.") {
          setError({
            ...error,
            email: errorMsg,
          });
        } else if (errorMsg === "Something went wrong. Please try again.") {
          setError({
            ...error,
            email: errorMsg,
          });
        }
      }
    }
  }

  return (
    <div className="signup">
      <h1 className="normal-title">Sign up</h1>
      <h1 className="no-underline-title">to start your 8by8 journey</h1>

      <p className="required-text">*Required information</p>

      <form className="form" onSubmit={handleSubmit}>
        {/* name */}
          <label
            htmlFor="name"
            className={
              activeFields.name
                ? "floating-label-active"
                : "floating-label-default"
            }
            onClick={() => {
              document.getElementById("name").focus();
            }}
          >
            Name*
          </label>
          <input
            type="text"
            name="name"
            className="register-input"
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setActiveFields({ ...activeFields, name: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, name: true });
            }}
            onClick={() => {
              setActiveFields({ ...activeFields, name: true });
            }}
          />
          {error.name && <p className="error-msg">{error.name}</p>}
        {/* email */}
          <label
            htmlFor="email"
            className={
              activeFields.email
                ? "floating-label-active"
                : "floating-label-default"
            }
            onClick={() => {
              document.getElementById("email").focus();
            }}
          >
            Email*
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="register-input"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setActiveFields({ ...activeFields, email: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, email: true });
            }}
            onClick={() => {
              setActiveFields({ ...activeFields, email: true });
            }}
          />
          {error.email && <p className="error-msg">{error.email}</p>}
        {/* confirmation email */}
          <label
            htmlFor="re-email"
            className={
              activeFields.confirmEmail
                ? "floating-label-active"
                : "floating-label-default"
            }
            onClick={() => {
              document.getElementById("re-email").focus()
            }}
          >
            Re-enter Email Address*
          </label>
          <input
            type="email"
            name="re-email"
            id="re-email"
            className="register-input"
            value={formData.confirmEmail}
            onChange={(e) => {
              setFormData({ ...formData, confirmEmail: e.target.value });
              setActiveFields({ ...activeFields, confirmEmail: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, confirmEmail: true });
            }}
            onClick={() => {
              setActiveFields({ ...activeFields, confirmEmail: true });
            }}
          />
          {error.confirmEmail && (
            <p className="error-msg">{error.confirmEmail}</p>
          )}
        {/* avatars */}
        <p className="small-title">Which One's you? </p>
        <div className="avatar-container">
          {/* 1 */}
          <input
            type="radio"
            id="avatar-1"
            name="avatar"
            value="1"
            onChange={(e) =>
              setFormData({ ...formData, avatar: e.target.value })
            }
            defaultChecked
          />
          <label htmlFor="avatar-1">
            <img className="avatar-img" src={avatar1} alt="avatar1" />
          </label>
          {/* 2 */}
          <input
            type="radio"
            id="avatar-2"
            name="avatar"
            value="2"
            onChange={(e) =>
              setFormData({ ...formData, avatar: e.target.value })
            }
          />
          <label htmlFor="avatar-2">
            <img className="avatar-img" src={avatar2} alt="avatar2" />
          </label>
          {/* 3 */}
          <input
            type="radio"
            id="avatar-3"
            name="avatar"
            value="3"
            onChange={(e) =>
              setFormData({ ...formData, avatar: e.target.value })
            }
          />
          <label htmlFor="avatar-3">
            <img className="avatar-img" src={avatar3} alt="avatar3" />
          </label>
          {/* 4 */}
          <input
            type="radio"
            id="avatar-4"
            name="avatar"
            value="4"
            onChange={(e) =>
              setFormData({ ...formData, avatar: e.target.value })
            }
          />
          <label htmlFor="avatar-4">
            <img className="avatar-img" src={avatar4} alt="avatar4" />
          </label>
        </div>

        {/* tos & recaptcha section */}
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
          <a href="/termsofservice" className="link">
            Terms of Service
          </a>{" "}
          and the{" "}
          <a href="/privacypolicy" className="link">
            Privacy Policy
          </a>
        </p>

        {/* submit */}
        <button
          className="gradient-button"
          type="submit"
          value="Submit"
          disabled={!reCaptchaPassed}
        >
          Sign Up
        </button>
        <p className="signin small-text">
          Already have an account?{" "}
          <a href="/signin" className="link">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
