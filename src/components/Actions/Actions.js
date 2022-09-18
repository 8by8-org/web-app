import React, { useState, useEffect } from "react";
import {
  getChallengerDatabase,
  getUserDatabase,
  getUserVoterRegistrationData
} from "./../../functions/UserData";
import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { usePartners } from "../../contexts/PartnersContext";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import Avatar1 from "./../../assets/avatars/avatar1.svg";
import Avatar2 from "./../../assets/avatars/avatar2.svg";
import Avatar3 from "./../../assets/avatars/avatar3.svg";
import Avatar4 from "./../../assets/avatars/avatar4.svg";
import WhiteCurve from "./../../assets/images/Actions/Union.svg";
import Crown from "./../../assets/images/Actions/Crown.svg";
import ConfettiAnimation from "./../Utility/Helpers/ConfettiAnimation";
import Invite from "./../Utility/Invite/Invite";
import { ErrorModal } from "../Utility/ErrorModal/ErrorModal";
import "./Actions.scss";
import { LoadingWheel } from "./../Utility/LoadingWheel/LoadingWheel.component";
import { getPartnerData } from "../../functions/partnerData";
import PopupModal from "../Utility/PopupModal/PopupModal";
import stateVoteInfo from "../../data/state_vote_info.json";
import axios from "axios";

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4];
const apiUrl = "https://usvotes-6vsnwycl4q-uw.a.run.app";

export default function Actions() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const {partnersExist } = usePartners();
  const [loading, setLoading] = useState(true);
  const [challengerInfo, setChallengerInfo] = useState(null);
  const [registeredVoter, setRegisteredVoter] = useState(false);
  const [notifyElectionReminders, setNotifyElectionReminders] = useState(false);
  const [startedChallenge, setStartedChallenge] = useState(false);
  const [challengerFinishedChallenge, setChallengerFinishedChallenge] =
    useState();
  const [alreadyRedeemed, setAlreadyRedeemed] = useState();
  const [couponData, setCouponData] = useState();

  const [USState, setUSState] = useState(null);
  const toggleInvite = React.useRef();
  //for resending voter registration form's to the user's email address
  const [showTransparentLoadingWheel, setShowTransparentLoadingWheel] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    getUserDatabase().then((data) => {
      if (data.playerReward === undefined) {
        setAlreadyRedeemed(false);
      } else {
        setAlreadyRedeemed(true);
        getPartnerData(data.playerReward, setCouponData);
      }

      getChallengerDatabase().then((result) => {
        if (result.badges.length >= 8) {
          setChallengerFinishedChallenge(true);
        } else {
          setChallengerFinishedChallenge(false);
        }
      });
    });

    if (localStorage.getItem("challengerInfo")) {
      setChallengerInfo(JSON.parse(localStorage.getItem("challengerInfo")));
      if (currentUser) {
        fetchUserData();
      } else {
        setLoading(false);
      }
    } else {
      if (currentUser) {
        getUserDatabase()
          .then((data) => {
            if (data.invitedBy) {
              setRegisteredVoter(data.isRegisteredVoter);
              setUSState(data.voteInfo && data.voteInfo.state ? data.voteInfo.state : null);
              setStartedChallenge(data.startedChallenge);
              setNotifyElectionReminders(data.notifyElectionReminders);
              getChallengerInfo(data.invitedBy);
            } else {
              history.push(`/signin`);
            }
          })
          .catch((e) => console.log(e));
      } else {
        history.push(`/signup`);
      }
    }
  }, [currentUser, history]);

  // gets the info about which actions the signed in user has completed or not
  function fetchUserData() {
    getUserDatabase()
      .then((data) => {
        setRegisteredVoter(data.isRegisteredVoter);
        setUSState(data.voteInfo && data.voteInfo.state ? data.voteInfo.state : null);
        setStartedChallenge(data.startedChallenge);
        setNotifyElectionReminders(data.notifyElectionReminders);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }

  // if there is no challengerInfo and the user is signed in and has a invitedBy uid then using that uid get that users info and put it in local storage
  async function getChallengerInfo(invitedBy) {
    const db = getFirestore();
    const docRef = doc(db, "users", invitedBy);
    const query = await getDoc(docRef);
    const info = (({ name, avatar }) => ({ name, avatar }))(query.data());
    info.challengerID = invitedBy;
    setChallengerInfo(info);
    localStorage.setItem("challengerInfo", JSON.stringify(info));
    setLoading(false);
  }

  return !loading ? (
    <div>
      {/* if all three actions are completed */}
      {registeredVoter && notifyElectionReminders && startedChallenge ? (
        <div className="actions">
          <ConfettiAnimation time={8000} />
          <div className="top">
            <div className="avatar-and-status-finished">
              <div className="action-status-finished">
                <h1 className="heading">
                  {challengerFinishedChallenge ? (
                    alreadyRedeemed ? (
                      "here’s your reward!"
                    ) : (
                      "Challenge Won!"
                    )
                  ) : (
                    <>
                      You are done!
                      <br />
                      You Supported:
                    </>
                  )}
                </h1>
              </div>

              <div className="avatar-container">
                <div className="images">
                  <img
                    alt="Challenger Avatar"
                    src={
                      challengerInfo.avatar
                        ? avatars[challengerInfo.avatar - 1]
                        : avatars[0]
                    }
                    id="challenger-avatar"
                  />
                </div>

                <p id="challenger-name">{challengerInfo.name}</p>
              </div>
            </div>

            {alreadyRedeemed && couponData && (
              <div className="couponContainer">
                {
                  <div>
                    <img src={couponData.logo} alt="Partner Logo" />
                    <p>{couponData.rewardDescription} {couponData.redemptionDescription}</p>
                    <p>
                     Availability and terms subject to change.
                    </p>
                  </div>
                }
              </div>
            )}
          </div>

          <img alt="White Curve" src={WhiteCurve} className="curve" />

          <div className="action-items">
            {challengerFinishedChallenge && !alreadyRedeemed && partnersExist && (
              <div className="py-2">
                <button
                  className="gradient"
                  onClick={() =>
                    (window.location.href = "/choosereward?ref=player")
                  }
                >
                  <span>Choose a Reward</span>
                </button>
              </div>
            )}
            <div className="py-2">
              <button
                className="gradient"
                onClick={() => {
                  history.push(`/signin`);
                }}
              >
                <span>See Your Challenge</span>
              </button>
            </div>

            <div className="py-2">
              <button
                className="secondary-button"
                onClick={() => toggleInvite.current()}
              >
                Share About Your Actions
              </button>
            </div>
          </div>
        </div>
      ) : (
        // when there are actions that can still be completed by the user

        <div className="actions">
          <div className="top">
            <div className="avatar-and-status">
              <div className="action-status">
                {registeredVoter ||
                notifyElectionReminders ||
                startedChallenge ? (
                  <h1 className="heading">
                    {challengerFinishedChallenge
                      ? alreadyRedeemed
                        ? "here’s your reward!"
                        : "Challenge Won!"
                      : "You Took Action!"}
                  </h1>
                ) : (
                  <h1 className="heading">Take Action For:</h1>
                )}
              </div>

              <div className="avatar-container">
                <div className="images">
                  <img
                    alt="Challenger Avatar"
                    src={
                      challengerInfo.avatar
                        ? avatars[challengerInfo.avatar - 1]
                        : avatars[0]
                    }
                    id="challenger-avatar"
                  />
                  {(registeredVoter ||
                    notifyElectionReminders ||
                    startedChallenge) && (
                    <div id="challenger-crown">
                      <img
                        alt="Challenger Crown"
                        src={Crown}
                        className="crown"
                      />
                    </div>
                  )}
                </div>

                <p id="challenger-name">{challengerInfo.name}</p>
              </div>
            </div>

            {alreadyRedeemed && couponData && (
              <div className="couponContainer">
                {
                  <div>
                    <img src={couponData.logo} alt="Partner Logo" />
                    <p>{couponData.rewardConditions}</p>
                    <p>
                      {couponData.rewardConditions} Expires{" "}
                      {couponData.rewardEndDate === ""
                        ? " never"
                        : couponData.rewardEndDate}
                      . Availability and terms subject to change.
                    </p>
                  </div>
                }
              </div>
            )}
          </div>

          <img alt="White Curve" src={WhiteCurve} className="curve" />

          <div className="action-items">
            {/* when only Take the challenge action is left */}

            {registeredVoter && notifyElectionReminders && !startedChallenge ? (
              <h6 className="subheading">
                OTHER ACTIONS YOU CAN TAKE TO
                <br />
                HELP THE AAPI COMMUNITY
              </h6>
            ) : (
              // when there is at least one action completed
              (registeredVoter ||
                notifyElectionReminders ||
                startedChallenge) && (
                <h6 className="subheading">
                  {challengerFinishedChallenge ? (
                    alreadyRedeemed ? (
                      <>
                        {challengerInfo.name} won the 8by8 challenge! <br />
                        here are Other actions to help <br /> the aapi
                        community.
                      </>
                    ) : (
                      <>
                        {challengerInfo.name} won the 8by8 challenge, <br />
                        and you get a reward!
                      </>
                    )
                  ) : (
                    <>
                      {challengerInfo.name} GOT A BADGE!
                      <br />
                      HERE ARE OTHER ACTIONS TO HELP
                      <br />
                      THE AAPI COMMUNITY
                      <br />
                    </>
                  )}
                </h6>
              )
            )}
            {challengerFinishedChallenge && !alreadyRedeemed && partnersExist && (
              <div className="py-2">
                <button
                  className="gradient"
                  onClick={() =>
                    (window.location.href = "/choosereward?ref=player")
                  }
                >
                  <span>Choose a Reward</span>
                </button>
              </div>
            )}
            {/* action buttons only displayed when they are not completed */}
            {!registeredVoter && (
              <div className="py-2">
                <button
                  className="gradient"
                  onClick={() => {
                    history.push(`/voterreg`);
                    localStorage.setItem("player", "voterreg");
                  }}
                >
                  <span>Register to vote</span>
                </button>
              </div>
            )}

            {!notifyElectionReminders && (
              <div className="py-2">
                <button
                  className={registeredVoter ? "gradient" : "secondary-button"}
                  onClick={() => {
                    history.push(`/election-reminders`);
                    localStorage.setItem("player", "election-reminders");
                  }}
                >
                  <span>Get election reminders</span>
                </button>
              </div>
            )}

            {!startedChallenge && (
              <div className="py-2">
                <button
                  className={
                    registeredVoter && notifyElectionReminders
                      ? "gradient"
                      : "secondary-button"
                  }
                  onClick={() => {
                    history.push("/challengerwelcome");
                    localStorage.setItem("player", "progress");
                  }}
                >
                  <span>Take the challenge</span>
                </button>
              </div>
            )}

            {registeredVoter && notifyElectionReminders && !startedChallenge ? (
              // when only Take the challenge action is left
              <div>
                <h6 className="text">
                  Voting matters towards better AAPI
                  <br />
                  representation in our country. You can help
                  <br />
                  the community by encouring others to
                  <br />
                  register! Take the challenge on your own!
                  <br />
                </h6>
                <div className="links-container">
                  <a href="/homepage" className="links">
                    What is 8by8 Challenge?
                  </a>
                  <button
                    type="button"
                    className="link-share"
                    onClick={() => toggleInvite.current()}
                  >
                    Share about your actions
                  </button>
                </div>
              </div>
            ) : (
              // when at least one action is completed
              <div>
                {/* these are for when only that specific action is completed */}
                {registeredVoter &&
                  !notifyElectionReminders &&
                  !startedChallenge && (
                    <h6 className="text">Thanks for registering to vote!</h6>
                  )}

                {!registeredVoter &&
                  notifyElectionReminders &&
                  !startedChallenge && (
                    <h6 className="text">
                      Thanks for getting election reminders!
                    </h6>
                  )}

                {!registeredVoter &&
                  !notifyElectionReminders &&
                  startedChallenge && (
                    <h6 className="text">Thanks for taking the challenge!</h6>
                  )}

                {/* this is for when registered to vote or election reminders are turned on and challenge has been started */}
                {(registeredVoter || notifyElectionReminders) &&
                  startedChallenge && (
                    <h6 className="text">Thanks for your actions!</h6>
                  )}

                <div className="links-container">
                  {/* this is for when registered to vote or election reminders are turned on */}
                  {(() => {
                    if (!registeredVoter || !USState) return;
                    const stateInfo = stateVoteInfo.states[USState];
                    return (
                      <>
                        {stateInfo.onlinereg && (
                          <a
                            href={stateInfo.voteregsite}
                            target="_blank"
                            rel="noreferrer"
                            className="link-share"
                          >
                            Go to state website
                          </a>
                        )}
                        <button
                          type="button"
                          className="link-share"
                          onClick={() => {
                            setShowTransparentLoadingWheel(true);
                            if(currentUser && currentUser.uid) {
                              getUserVoterRegistrationData(currentUser.uid).then((data) => {
                                console.log(data);
                                axios
                                  .post(`${apiUrl}/registertovote/`, data)
                                  .then((res) => {
                                    setShowTransparentLoadingWheel(false);
                                    setShowSuccessModal(true);
                                  })
                                  .catch((e) => {
                                    setShowTransparentLoadingWheel(false);
                                    setShowErrorModal(true);
                                  });
                              }).catch(() => {
                                setShowTransparentLoadingWheel(false);
                                setShowErrorModal(true);
                              });
                            } else {
                              setShowTransparentLoadingWheel(false);
                              setShowErrorModal(true);
                            }
                          }}
                        >
                          Get your registration form again
                        </button>
                      </>
                    );
                  })()}
                  {((registeredVoter &&
                    !notifyElectionReminders &&
                    !startedChallenge) ||
                    (!registeredVoter &&
                      notifyElectionReminders &&
                      !startedChallenge)) && (
                    <button
                      type="button"
                      className="link-share"
                      onClick={() => toggleInvite.current()}
                    >
                      Share about your action
                    </button>
                  )}
                  {/* this is for when registered to vote or election reminders are turned on and challenge has been started */}
                  {(registeredVoter || notifyElectionReminders) &&
                    startedChallenge && (
                      <button
                        type="button"
                        className="link-share"
                        onClick={() => toggleInvite.current()}
                      >
                        Share about your actions
                      </button>
                    )}

                  {/* this is for when user has started their own challenge */}
                  {startedChallenge && (
                    <a href="/signin" className="links">
                      See your challenge
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Invite toggleInvite={toggleInvite} isShare={true} />
      {showTransparentLoadingWheel && <LoadingWheel overlay={true} />}
      {showSuccessModal && (
        <div className="actions-modal-outer-container">
          <div className="actions-modal-container">
            <IconContext.Provider value={{ color: "black" }}>
              <div className="actions-modal">
                <div className="actions-modal-toggle-container">
                  <button
                    className="actions-modal-toggle"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSuccessModal(false);
                    }}
                  >
                    <MdIcons.MdClose size={"1x"} />
                  </button>
                </div>
                <strong className="actions-modal-heading">
                  We emailed you!
                </strong>
                <p className="actions-modal-text">
                  Check your email to get your voter registration PDF form.
                </p>
                <button
                  className="actions-modal-btn"
                  onClick={() => {
                    setShowSuccessModal(false);
                  }}
                >
                  OK
                </button>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      )}
      {showErrorModal && <ErrorModal setShowSelf={setShowErrorModal} />}
    </div>
  ) : (
    <LoadingWheel overlay={false} />
  );
}
