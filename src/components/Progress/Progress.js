import React, { useState, useEffect } from "react";
import {
  getUserDatabase,
  completedAction,
  delay,
  restartChallenge,
} from "./../../functions/UserData";
import { useAuth } from "../../contexts/AuthContext";
import { addInvitedBy } from "../../functions/AddInvite";
import { makePlayerChallenger } from "../../functions/UserData";
import emailUser from "../../functions/Email";
import Invite from "../Invite.js";
import { LoadingWheel } from "../LoadingWheel/LoadingWheel.component";
import PopupModal from "../PopupModal";
import ConfettiAnimation from "../ConfettiAnimation";
import CurveA from "./../../assets/2-shapes/curve-a.svg";
import BlobDay from "./../../assets/4-pages/Progress/BlobDay.svg";

export default function Progress() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState();
  const [challengeVoid, setChallengeVoid] = useState(false);
  const [challengeFinished, setChallengeFinished] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [badges, setBadges] = useState([]);
  const [completedBadges, setCompletedBadges] = useState(0);
  const [registeredVoter, setRegisteredVoter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [button, setButton] = useState(
    <button className="gradient" onClick={() => toggleInvite.current()}>
      Invite friends
    </button>
  );
  const [confettiAnimation, setConfettiAnimation] = useState();
  const [loading, setLoading] = useState(false);

  const toggleInvite = React.useRef();

  useEffect(() => {
    if (localStorage.getItem("player") && currentUser) {
      setTimeout(() => {
        makePlayerChallenger();
        addInvitedBy();
        fetchUserData();
        setLoading(true);
      }, 3000);
    } else {
      fetchUserData();
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    // 8 days complete
    if (challengeVoid) {
      setOpenModal(true);
    }

    // successfully completes challenge
    if (challengeFinished) {
      setConfettiAnimation(<ConfettiAnimation time={8000} />);

      setButton(
        <button
          className="inverted"
          onClick={() => alert("no sharing functionality yet")}
        >
          Share
        </button>
      );
    }
  }, [challengeVoid, challengeFinished]);

  function fetchUserData() {
    getUserDatabase()
      .then((data) => {
        // days left of challenge
        let daysLeft = data.challengeEndDate;
        let milisecondsLeft = new Date(daysLeft.seconds * 1000) - new Date();
        let days = Math.floor(milisecondsLeft / 1000 / 60 / 60 / 24 + 1);
        if (days < 1) {
          days = 0;
        }

        // gets all badges
        let badgeArr = data.badges;
        while (badgeArr.length > 8) {
          badgeArr.pop();
        }
        setCompletedBadges(badgeArr.length);
        const badgesLength = badgeArr.length;
        while (badgeArr.length < 8) {
          badgeArr.push(0);
        }

        setUserData(data);
        setDaysLeft(days);
        setRegisteredVoter(data.isRegisteredVoter);
        setBadges(badgeArr);

        // checks if challenge is void
        if (badgesLength < 8 && days < 1) {
          setChallengeVoid(true);
        }

        // checks if challenge is completed
        if (badgesLength === 8) {
          setChallengeFinished(true);
        }
      })
      .catch((e) => console.log(e));
  }

  async function reloadPage() {
    await delay(500);
    window.location.reload();
  }

  const testing = (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "4px red solid",
        margin: "20px 0",
        textAlign: "center",
      }}
    >
      temporary testing
      <button
        onClick={() => {
          completedAction("test add badge");
          reloadPage();
        }}
      >
        add player badge
      </button>
      <button
        onClick={() => {
          completedAction("share challenge");
          reloadPage();
        }}
      >
        add share badge
      </button>
      <button
        onClick={() => {
          completedAction("register to vote");
          reloadPage();
        }}
      >
        add register badge
      </button>
      <button
        onClick={() => {
          restartChallenge();
          reloadPage();
        }}
      >
        restart challenge
      </button>
    </section>
  );

  function Badge(props) {
    const index = props.index + 1;
    let name = null;
    let icon = null;
    if (props.value !== 0) {
      icon = props.value.badge.icon;
      name = props.value.badge.name;
    }
    return (
      <div className="badges">
        <div className="blob">
          <img
            className={icon ? "" : "disable"}
            src={
              require(`./../../assets/4-pages/Progress/Badges/Blob${index}.svg`)
                .default
            }
          />
        </div>
        <div className="blob-content">
          {icon ? (
            <img
              className="icon"
              src={
                require(`./../../assets/4-pages/Progress/Badges/${icon}.svg`)
                  .default
              }
            />
          ) : (
            <p className="index number-shadow-sm">{index}</p>
          )}
          {name ? <h3>{name}</h3> : <></>}
        </div>
      </div>
    );
  }

  return loading ? (
    <article className="progress-page">
      {confettiAnimation}
      <section className="section-1 bg-black pt-32px pl-30px pb-80px">
        <h1>
          Your <br /> challenge <br /> badges
        </h1>
        <div className="days-blob-container">
          <div className="days-label">
            <p className="number-shadow">{daysLeft}</p>
            <h3 className="text-black">
              {daysLeft === 1 ? "Day" : "Days"} left
            </h3>
          </div>
          <img className="blob" src={BlobDay} />
        </div>
      </section>
      <img className="curve" src={CurveA} />

      <section className="section-2 pt-32px pl-30px pr-30px">
        <h3 className="text-center pb-24px">
          You completed {completedBadges === 8 ? " all " : " "}
          <span className="underline">{completedBadges}</span> badges
        </h3>
        {button}
        {!registeredVoter ? (
          <div>
            <p className="text-center mt-24px b6">
              Not registered to vote yet?
            </p>
            <p className="text-center b2">
              <a href="/voterreg">Register now</a> and earn a badge!
            </p>
          </div>
        ) : (
          <></>
        )}
      </section>

      {/* remove this setion when done with testing */}
      {testing}

      <section className="section-3 mt-24px">
        {badges.map((value, index) => {
          return <Badge value={value} index={index} key={index} />;
        })}
      </section>

      <section className="section-4 pl-30px pr-30px pb-40px">
        {button}
        {!registeredVoter ? (
          <div>
            <p className="text-center mt-24px b6">
              Not registered to vote yet?
            </p>
            <p className="text-center b2">
              <a href="/voterreg">Register now</a> and earn a badge!
            </p>
          </div>
        ) : (
          <></>
        )}
      </section>

      {openModal && (
        <PopupModal
          setOpenModal={setOpenModal}
          content={
            <>
              <div className="b1">
                Oops, times up! But no worries, restart your challenge to
                continue!
              </div>
              <button
                className="gradient"
                onClick={() => {
                  restartChallenge();
                  fetchUserData();
                  setOpenModal(false);
                }}
              >
                <span>Restart Challenge</span>
              </button>
            </>
          }
        />
      )}

      <Invite toggleInvite={toggleInvite} isShare={false} />
    </article>
  ) : (
    <LoadingWheel overlay={false} />
  );
}
