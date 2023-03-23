import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "react-bootstrap";
import "./HomePage.scss";
import Logo from "../../../assets/logos/white-logo.svg";
import Curve1 from "../../../assets/images/HomePage/Curve1.svg";
import SpeechBubble1 from "../../../assets/images/HomePage/SpeechBubble1.png";
import Sign from "../../../assets/images/HomePage/Sign.png";
import Curve2 from "../../../assets/images/HomePage/Curve2.svg";
import SpeechBubble2 from "../../../assets/images/HomePage/SpeechBubble2.png";
import Mic from "../../../assets/images/HomePage/Mic.png";
import SpeechBubble3 from "../../../assets/images/HomePage/SpeechBubble3.png";
import Curve3 from "../../../assets/images/HomePage/Curve3.svg";

export default function HomePage() {
  const history = useHistory();

  useEffect(() => {
    const result = window.localStorage.getItem("verifying");
    if (result) {
      history.push("/verifysuccess");
    }
  }, [history]);

  return (
    <div className="homepage">
      <div className="content-1">
        <div className="description">
          <img className="logo" src={Logo} alt="8by8 Logo" />
          <div className="text">
            GET <u className="underline">8 AAPI FRIENDS</u> TO REGISTER TO VOTE
            IN <u className="underline">8 DAYS</u>
          </div>
          <button
            className="challenge-button"
            onClick={() => history.push("/challengerwelcome")}
          >
            <span>Take the Challenge</span>
          </button>
          <a
            href="/why8by8"
            className="link"
            style={{
              paddingBottom: "2em",
              color: "#02DDC3",
              zIndex: "1",
              position: "relative",
              top: "-1.8em",
            }}
          >
            {" "}
            See why others are doing it
          </a>
        </div>
      </div>

      <div className="curve-div">
        <img
          className="curve curve-1"
          id="why8by8"
          src={Curve1}
          alt="yellow curve"
        />
      </div>

      <div className="content-2">
        <img className="speech-bubble" src={SpeechBubble1} alt="why 8by8?" />
        <img className="sign" src={Sign} alt="sign" />
      </div>

      <div className="content-3">
        <p>
          In 2020, we saw an unprecedented{" "}
          <b>
            150% spike in anti-AAPI (Asian American Pacific Islander) hate
            crimes
          </b>
          , a trend that is already continuing into 2021. This is both a
          national and a local problem.
        </p>
      </div>

      <div className="curve-div">
        <img className="curve" src={Curve2} alt="teal curve" />
      </div>

      <div className="content-4">
        <p>
          <span className="bold-shadow">150%</span> spike in anti-Asian and
          anti-AAPI hate crimes in 2020
        </p>
      </div>

      <div className="content-5">
        <img className="speech-bubble" src={SpeechBubble2} alt="solution?" />
        <div className="bold-shadow">
          We need
          <br /> more aapi
          <br /> voters
        </div>
        <img className="mic" src={Mic} alt="mic" />
      </div>

      <div className="content-6">
        <div className="text">
          the path to fixing this problem starts with{" "}
          <u className="underline">closing the representation gap</u> In
          Asian-American communities.
        </div>
        <p className="stat">
          Asian American voter turnout rate has remained Below
        </p>
        <div className="stat-1">
          <div className="bold-shadow">60%</div>
        </div>
        <p className="stat">Asian-Americans make up</p>
        <div className="stat-2">
          <div className="bold-shadow">7%</div>
        </div>
        <p className="bottom-stat">of the population </p>
        <p className="stat">but only</p>
        <div className="stat-3">
          <div className="bold-shadow">3%</div>
        </div>
        <p className="bottom-stat">of Congress is Asian or AAPI </p>
      </div>

      <div className="curve-div">
        <img className="curve" src={Curve3} alt="black curve" />
      </div>

      <div className="content-7">
        <img
          className="speech-bubble"
          src={SpeechBubble3}
          alt="we need your help!"
        />
        <div className="text">
          we're asking everyone to join us in{" "}
          <u className="underline">taking the #8by8challenge</u> and registering
          8 of their friends to vote in 8 days.
        </div>
        <button
          className="challenge-button"
          onClick={() => history.push("/challengerwelcome")}
        >
          <span>Take the Challenge</span>
        </button>
        <div className="description">
          The 8by8 mission aims to build civic participation and bring awareness
          to the struggles of AAPI citizens, while encouraging community
          involvement and investment. Our approach involves working with
          community, business, and tech leaders to create voter registration
          solutions that work.
          <br />
          <a
            href="https://www.8by8.us/"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Learn more about 8by8
          </a>
        </div>
      </div>
    </div>
  );
}
