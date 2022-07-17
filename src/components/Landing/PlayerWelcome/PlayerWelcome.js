import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import SignUp1 from "../../../assets/images/PlayerWelcome/SignUp1.png";
import SignUp2 from "../../../assets/images/PlayerWelcome/SignUp2.png";
import Vote from "../../../assets/images/PlayerWelcome/Vote1.png";
import BlackCurve from "../../../assets/images/PlayerWelcome/BlackCurve.svg";
import "./PlayerWelcome.scss";
<<<<<<< HEAD:src/components/Landing/PlayerWelcome/PlayerWelcome.js
import { auth } from "../../../firebase";
import { dummyPassword } from "../../../constants";
import { useAuth } from "../../../contexts/AuthContext";
import { LoadingWheel } from "../../Utility/LoadingWheel/LoadingWheel.component";
=======
import { auth } from "../../firebase";
import { dummyPassword } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingWheel } from "../LoadingWheel/LoadingWheel.component";
import ChallengerShare from "../../assets/images/Share/ChallengerShare.png";
import PlayerShare from "../../assets/images/Share/PlayerShare.png";
import MetaTags from 'react-meta-tags';
>>>>>>> 0ae281d19ec71fc1ea157a19c9ae493d20e1c524:src/components/PlayerWelcome/PlayerWelcome.js

export default function PlayerWelcome({ isShare }) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const history = useHistory();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [challengerInfo, setChallengerInfo] = useState(null);

  const url = window.location.href;
  const code = url.split("/").pop();

  async function getChallengerInfo() {
    const db = getFirestore();
    // If isShare is false then use the uid of the current user, else use the code gotten from the url.
    const docRef = doc(db, "users", isShare === false ? currentUser.uid : code);

    //only log in with substitute user if not already authenticated
    //only challenger's name and avatar is stored for security
    if (currentUser) {
      const query = await getDoc(docRef);
      // Just in case query.data() does not return anything, then send the user to the signin page.
      if (query.data()) {
        const info = (({ name, avatar }) => ({ name, avatar }))(query.data());
        info.challengerID = code;
        isShare === undefined &&
          localStorage.setItem("challengerInfo", JSON.stringify(info));
        if (isShare === false) {
          setChallengerInfo(info);
        } else {
          setChallengerInfo(JSON.parse(localStorage.getItem("challengerInfo")));
        }
      } else {
        history.push(`/signin`);
      }
    } else {
      await auth.signInWithEmailAndPassword(
        auth.getAuth(),
        "wkvxgesiknosbamhei@kvhrr.com",
        dummyPassword
      );
      const query = await getDoc(docRef);
      const info = (({ name, avatar }) => ({ name, avatar }))(query.data());
      info.challengerID = code;
      localStorage.setItem("challengerInfo", JSON.stringify(info));
      auth.getAuth().signOut();
      setChallengerInfo(JSON.parse(localStorage.getItem("challengerInfo")));
    }
  }

  // If code that is gotten from the url is playerwelcome or isShare is true then, if there is challengerInfo in
  // local storage then set it to challengerInfo, else send the user to the signin page. For eveything else run getChallengerInfo.
  useEffect(() => {
    code === "playerwelcome" || isShare
      ? localStorage.getItem("challengerInfo")
        ? setChallengerInfo(JSON.parse(localStorage.getItem("challengerInfo")))
        : history.push(`/signin`)
      : getChallengerInfo();
  }, []);

  // Render page after challengerInfo is gotten.
  useEffect(() => {
    challengerInfo && setLoading(false);
  }, [challengerInfo]);

  // If isShare is undefined, when playerwelcome page is rendered not in invite or share, then the buttons work.
  return loading === false ? (
    <div className={"player-welcome" + ((isShare || isShare === false) ? " preview" : "")}>
      {urlParams.get("metaTag") == "challenger" ?
        <MetaTags>
          <title>Help me in my 8by8 Challenge to #stopasianhate.</title>
          <meta property="og:title" content="Help me in my 8by8 Challenge to #stopasianhate."/>
          <meta property="og:image" content={ChallengerShare}/>
          <meta property="og:url" content={"https://challenge.8by8.us/playerwelcome"}/>
        </MetaTags>
      : urlParams.get("metaTag") == "player" ?
          <MetaTags>
            <title>"I’m supporting the 8by8 Challenge!"</title>
            <meta property="og:title" content={"I’m supporting the 8by8 Challenge!"}/>
            <meta property="og:image" content={PlayerShare}/>
            <meta property="og:url" content={"https://challenge.8by8.us/playerwelcome"}/>
          </MetaTags>
        :
          <MetaTags>
            <meta
            name="description"
            content="8by8 Challenge App, made by 8by8.us with ❤️ "
            />
            <title>8by8</title>
          </MetaTags>
      }
      <div className="top">
        <h1 className="top-heading">
          <span className="underline h1">Support</span>{" "}
          {challengerInfo && challengerInfo.name !== null
            ? `${challengerInfo.name}'s`
            : "the"}{" "}
          8by8 Challenge!
        </h1>

        <p className="text">
          <b>
            Help{" "}
            {challengerInfo && challengerInfo.name !== null
              ? challengerInfo.name
              : "your friend"}{" "}
            win their <u>8by8 Challenge</u> by registering to vote or taking
            other actions to #stopasianhate!
          </b>
        </p>

        <button
          className="gradient"
          onClick={() => {
            isShare === undefined && history.push(`/actions`);
          }}
        >
          <span>Get Started</span>
        </button>
        {!currentUser && (
          <div align="center">
            <p className="small-text">
              Already have an account?{" "}
              <button
                className="signin-link blue"
                onClick={() => {
                  isShare === undefined && history.push(`/signin`);
                }}
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>
      <img src={BlackCurve} className="curve" alt="Black Curve" />
      <div className="main-content">
        <h2 className="heading underline">Here's how it works</h2>
        <h3>1. Choose an action to take</h3>
        <p className="text">
          You can take any number of the available actions: register to vote,
          get election reminders or take the 8by8 challenge yourself. Pick one
          to start.
        </p>
        <div className="image">
          <img src={SignUp1} alt="8by8 Logo" />
        </div>
        <h3>2. Your friend will earn a badge</h3>
        <p className="text">
          Any of the 3 actions will help your friend earn a badge and get closer
          to winning the challenge.
        </p>
        <div className="image">
          <img src={SignUp2} alt="8by8 Logo" />
        </div>
        <h3>3. Come back and take more actions</h3>
        <p className="text">
          Whether it is to help the same friend or a different one, the more
          actions you take, the better! Note that you can only help earn one
          badge per friend.
        </p>
        <div className="image">
          <img src={Vote} alt="8by8 Logo" />
        </div>
        <button
          className="gradient"
          onClick={() => {
            isShare === undefined && history.push(`/actions`);
          }}
        >
          <span>Get Started</span>
        </button>
        {!currentUser && (
          <p align="center" className="small-text">
            Already have an account?{" "}
            <button
              className="signin-link black"
              onClick={() => {
                isShare === undefined && history.push(`/signin`);
              }}
            >
              Sign In
            </button>
          </p>
        )}
      </div>
    </div>
  ) : (
    <LoadingWheel overlay={false} />
  );
}
