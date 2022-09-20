import React, { useState, useEffect,  } from "react";
import {
  completedAction,
  getChallengerDatabase,
  getUserDatabase,
  restartChallenge,
} from "./../../../functions/UserData";
import { useAuth } from "../../../contexts/AuthContext";
import { usePartners } from "../../../contexts/PartnersContext";
import { addInvitedBy } from "../../../functions/AddInvite";
import { makePlayerChallenger } from "../../../functions/UserData";
import Invite from "./../../Utility/Invite/Invite";
import { LoadingWheel } from "./../../Utility/LoadingWheel/LoadingWheel.component";
import PopupModal from "./../../Utility/PopupModal/PopupModal";
import ConfettiAnimation from "../../Utility/Helpers/ConfettiAnimation";
import CurveA from "./../../../assets/2-shapes/curve-a.svg";
import BlobDay from "./../../../assets/4-pages/Progress/BlobDay.svg";
import rewardsIllustration from "./../../../assets/images/rewardsIllustration.svg";
import "./Progress.scss";
import { getPartnerData } from "../../../functions/partnerData";

export default function Progress() {
  const { currentUser } = useAuth();
  const { partnersExist } = usePartners();
  const [challengeVoid, setChallengeVoid] = useState(false);
  const [challengeFinished, setChallengeFinished] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [badges, setBadges] = useState([]);
  const [completedBadges, setCompletedBadges] = useState(0);
  const [registeredVoter, setRegisteredVoter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [canRedeem, setCanRedeem] = useState();
  const [alreadyRedeemed, setAlreadyRedeemed] = useState();
  const [couponData, setCouponData] = useState();
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
        completedAction("take challenge");
        addInvitedBy();
        fetchUserData();
        setLoading(true);
      }, 3000);
    } else {
      fetchUserData();
    }
  }, [currentUser]);

  useEffect(() => {
    // successfully completes challenge
    if (challengeFinished) {
      setConfettiAnimation(<ConfettiAnimation time={8000} />);

      setButton(
        <button className="inverted" onClick={() => toggleInvite.current()}>
          <span>Share</span>
        </button>
      );
    }

    // 8 days complete
    else if (challengeVoid) {
      setButton(
        <button
          className="inverted"
          onClick={() => {
            restartChallenge();
            fetchUserData();
            setButton(
              <button
                className="gradient"
                onClick={() => toggleInvite.current()}
              >
                Invite friends
              </button>
            );
          }}
        >
          Restart Challenge
        </button>
      );
      setOpenModal(true);
    }
  }, [challengeVoid, challengeFinished]);

  async function fetchUserData() {
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

        if (data.badges.length >= 8) {
          setCanRedeem(true);
          if (data.challengeReward === undefined) {
            setAlreadyRedeemed(false);
          } else {
            setAlreadyRedeemed(true);
            getPartnerData(data.challengeReward, setCouponData);
          }
        } else {
          setCanRedeem(false);
        }

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

        setLoading(true);
      })
      .catch((e) => console.log(e));
  }

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
            alt="player badge background blob"
            className={icon ? "blob-img blob-img-" + index : "disable"}
            src={
              require(`./../../../assets/4-pages/Progress/Badges/Blob${index}.png`)
                .default
            }
          />
        </div>
        <div className={"blob-content"}>
          {icon ? (
            <img
              alt="player badge icon"
              className="icon"
              src={
                require(`./../../../assets/4-pages/Progress/Badges/${icon}.svg`)
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
          {challengeFinished ? (
            !alreadyRedeemed ? (
              <>
                You've Won! <br /> The <br />
                Challenge
              </>
            ) : (
              <>
                You've Won! <br /> Here's <br /> Your <br /> Reward
              </>
            )
          ) : (
            <>
              Your <br /> challenge <br /> badges
            </>
          )}
        </h1>
        <div className="days-blob-container">
          <img
            className="blob"
            src={challengeFinished ? rewardsIllustration : BlobDay}
            alt="days remaining blob"
          />
          {!challengeFinished && (
            <div className="days-label">
              <p className="number-shadow">{daysLeft}</p>
              <h3 className="text-black">
                {daysLeft === 1 ? "Day" : "Days"} left
              </h3>
            </div>
          )}
        </div>
        {alreadyRedeemed && couponData && (
          <div className="couponContainer">
            {
              <div>
                <div className="img-bg">
                  <img src={couponData.logo} alt="Partner Logo" />
                </div>
                <p>{couponData.rewardDescription} {couponData.redemptionDescription}</p>
                <p>
                  Availability and terms subject to change.
                </p>
              </div>
            }
          </div>
        )}
      </section>
      <img className="curve" src={CurveA} alt="black curve" />

      <section className="section-2 pt-32px pl-30px pr-30px">
        <h3 className="text-center pb-24px">
          You completed {completedBadges === 8 ? " all " : " "}
          <span className="underline">{completedBadges}</span> badges
        </h3>
        {challengeFinished && !alreadyRedeemed && partnersExist && (
          <button
            className="gradient"
            onClick={() => {
              document.location.href = "/choosereward?ref=challenger";
            }}
          >
            Choose A Reward
          </button>
        )}
        {button}
        {!registeredVoter ? (
          <div>
            <p className="text-center mt-24px b2">
              Not registered to vote yet?
              <br />
              <a href="/voterreg">Register now</a> and earn a badge!
            </p>
          </div>
        ) : (
          <></>
        )}
      </section>

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
          theme={"modalContainer"}
          content={
            <>
              <div className="b1">
                Oops, times up! But no worries, restart your challenge to
                continue!
              </div>
              <button
                className="gradient small"
                onClick={() => {
                  restartChallenge();
                  fetchUserData();
                  setOpenModal(false);
                  setButton(
                    <button
                      className="gradient"
                      onClick={() => toggleInvite.current()}
                    >
                      Invite friends
                    </button>
                  );
                }}
              >
                <span>Restart Challenge</span>
              </button>
            </>
          }
        />
      )}

      <Invite
        toggleInvite={toggleInvite}
        isShare={false}
        challengeWon={challengeFinished}
      />
    </article>
  ) : (
    <LoadingWheel overlay={false} />
  );
}
