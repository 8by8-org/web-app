import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../../../contexts/AuthContext";
import axios from "axios";
import "../../VoterRegistration.scss";
import ScrollToTop from "../../../../../functions/ScrollToTop";
import stateJson from "../../../../../data/state_vote_info.json";
import { Link } from "react-router-dom";
import PopupModal from "../../../../Utility/PopupModal/PopupModal";
import { clearVoterRegInfo } from "../../utils/UpdateRegInfo";
import { getUserDatabase } from "../../../../../functions/UserData";
import { LoadingWheel } from "../../../../Utility/LoadingWheel/LoadingWheel.component";
const apiUrl = "https://usvotes-6vsnwycl4q-uw.a.run.app";

export const FormCompleted = () => {
  const history = useHistory();
  const { currentUserData, voterRegistrationData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(currentUserData);
  const [error, setError] = useState("");
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showExpectModal, setShowExpectModal] = useState(false);
  const [showMailRegModal, setShowMailRegModal] = useState(false);
  const [allowOnlineReg, setAllowOnlineReg] = useState(true);
  const [userState, setUserState] = useState();
  const [userStateShort, setUserStateShort] = useState();
  const [onlineRegLink, setOnlineRegLink] = useState();
  const [showGetEmail, setShowGetEmail] = useState(false);
  const ToggleReminderModal = (e) => setShowReminderModal(!showReminderModal);
  const ToggleExpectModal = (e) => setShowExpectModal(!showExpectModal);
  const ToggleMailRegModal = (e) => setShowMailRegModal(!showMailRegModal);
  const ToggleShowGetEmail = (e) => setShowGetEmail(true);

  let redirect = "/progress";
  if (currentUserData && currentUserData.invitedBy.length > 0) {
    redirect = "/actions";
  }

  useEffect(() => {
    setTimeout(() => {
      getUserDatabase().then((data) => {
        setUserData(data);
      });
      getStateRegData();
      setIsLoading(false);
    }, 1000);
  }, []);

  ScrollToTop();

  const getStateRegData = () => {
    let userState = voterRegistrationData.state;
    if (userData && userData.voteInfo && userData.voteInfo.state) {
      userState = userData.voteInfo.state;
    }
    //stateJson is now imported directly into this file, so there is no need to make a fetch call
    setUserState(stateJson.states[userState].name);
    setAllowOnlineReg(stateJson.states[userState].onlinereg);
    setOnlineRegLink(stateJson.states[userState].voteregsite);
    setUserStateShort(userState.toLowerCase());
  };

  return (
    <>
      <form className="voterRegForm">
        <h1 className="register-form-title">
          <u className="underline">YOU COMPLETED</u>
          <br />
          THE FORM!
        </h1>

        {isLoading && <LoadingWheel overlay={true} />}
        {allowOnlineReg && !showGetEmail ? (
          <div>
            <p className="register-form-text-completed">
              To complete the full process with your state, please go to the{" "}
              {userState} website to complete your voter registration!
            </p>
            <button
              className="tight-btn"
              onClick={(e) => {
                e.preventDefault();
                ToggleReminderModal(e);
              }}
            >
              CONTINUE TO STATE WEBSITE
            </button>
            {userData.isRegisteredVoter &&
              userData.voteInfo &&
              Object.keys(userData.voteInfo).length > 0 && (
                <div>
                  <p className="register-form-text-label">
                    Or register by mail!
                  </p>
                  <p className="register-form-text-tight">
                    We can email you a PDF file of your completed form. Print it
                    out and mail it to your state to complete your voter
                    registration.{" "}
                    <a
                      className="link--light"
                      onClick={async (e) => {
                        e.preventDefault();
                        setIsLoading(true);
                        ToggleShowGetEmail(e);
                        axios
                          .post(`${apiUrl}/registertovote/`, userData.voteInfo)
                          .then((res) => {
                            setIsLoading(false);
                            setError(``);
                          })
                          .catch((e) => {
                            setIsLoading(false);
                            setError(
                              `There was a problem creating your paperwork. ${e.response.data.error}. `
                            );
                          });
                      }}
                    >
                      Get email with PDF file.
                    </a>
                  </p>
                  {error && <p className="error-message">{error}</p>}
                </div>
              )}
            {/* <a
          onClick={() => {
            clearVoterRegInfo();
            history.push("/voterreg");
          }}>
            Clear voter registration info
          </a> */}
            <Link className="link--light register-form-text" to={redirect}>
              Back to 8by8 Challenge
            </Link>
          </div>
        ) : (
          <div>
            <p className="register-form-text">
              We've emailed you a PDF of your completed form. You can print it
              out and mail it to your state to complete your voter registration.
            </p>
            <button
              className="tight-btn"
              onClick={(e) => {
                e.preventDefault();
                history.push(redirect);
              }}
            >
              GO TO 8BY8 CHALLENGE
            </button>
          </div>
        )}
      </form>

      {showReminderModal && (
        <PopupModal
          setOpenModal={setShowReminderModal}
          theme={"modalContainer--light"}
          content={
            <>
              <div className="reminder-modal">
                <h3>
                  COMPLETE REGISTRATION <br />
                  ONLINE WITH YOUR STATE
                </h3>
                <p className="register-form-text-tight">
                  Make sure to have your
                  <span className="bold"> State ID</span> or{" "}
                  <span className="bold">driver's license</span> ready. If you
                  do not have either of these, you can{" "}
                  <a
                    className="link--light"
                    onClick={(e) => {
                      e.preventDefault();
                      ToggleExpectModal(e);
                      ToggleMailRegModal(e);
                    }}
                  >
                    register by mail.
                  </a>
                </p>
                <a
                  className="a-btn"
                  target="_blank"
                  onClick={(e) => {
                    ToggleReminderModal(e);
                  }}
                  href={onlineRegLink}
                >
                  GO TO STATE WEBSITE
                </a>
                <button
                  className="btnlink"
                  onClick={(e) => {
                    e.preventDefault();
                    ToggleExpectModal(e);
                    ToggleReminderModal(e);
                  }}
                >
                  How does this work?
                </button>
              </div>
            </>
          }
        ></PopupModal>
      )}
      {showExpectModal && (
        <PopupModal
          setOpenModal={setShowExpectModal}
          theme={"modalContainer--light-expect"}
          scroll={true}
          content={
            <>
              <div className="reminder-modal">
                <h3>WHAT TO EXPECT AT YOUR STATE WEBSITE</h3>
                <div>
                  <h3 className="MargTop">
                    1. FINISH YOUR STATE'S VOTER REGISTRATION ONLINE
                  </h3>
                  <p>
                    To complete the full process with your state, you will be
                    asked a few additional questions online. Make sure to have
                    your State ID or driver's license ready. If you do not have
                    either of these, you can{" "}
                    <a
                      className="link--light"
                      onClick={(e) => {
                        e.preventDefault();
                        ToggleExpectModal(e);
                        ToggleMailRegModal(e);
                      }}
                    >
                      register by mail.
                    </a>
                  </p>
                  <h3 className="MargTop">
                    2. WAIT FOR THE STATE TO CONFIRM YOUR APPLICATION
                  </h3>
                  <p>
                    Depending on your state, it could take 3-5 days to process
                    your application. You will receive a Voter Notification Card
                    from your county elections office.
                  </p>
                  <a
                    className="link-left"
                    href={"https://vote.gov/register/" + userStateShort}
                    target="_blank"
                  >
                    Voter registration resources
                  </a>
                  <a
                    className="a-btn--tm40"
                    target="_blank"
                    href={onlineRegLink}
                  >
                    GO TO STATE WEBSITE
                  </a>
                </div>
              </div>
            </>
          }
        ></PopupModal>
      )}
      {showMailRegModal && (
        <PopupModal
          setOpenModal={setShowMailRegModal}
          theme={"modalContainer--light-expect"}
          content={
            <>
              <div className="reminder-modal">
                <h3>COMPLETE VOTER REGISTRATION BY MAIL</h3>
                <div>
                  <h3 className="MargTop">1. CHECK YOUR EMAIL</h3>
                  <p>
                    We emailed you a PDF of your completed form. You can print
                    it out and mail it to your state to complete your voter
                    registration.
                  </p>
                  <h3>2. MAIL IT IN</h3>
                  <p>
                    Send the completed form to your Secretary of State's office.
                  </p>
                  <button
                    className="tight-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      ToggleMailRegModal(e);
                    }}
                  >
                    OK, GOT IT
                  </button>
                </div>
              </div>
            </>
          }
        ></PopupModal>
      )}
      <div className="reg-more-infoContainer">
        <p className="register-form-text-label">More information</p>
        <button
          className="info-link"
          onClick={(e) => {
            e.preventDefault();
            ToggleMailRegModal(e);
          }}
        >
          How to register to vote by mail
        </button>
        <br />
        {allowOnlineReg && (
          <>
            <a className="info-link" href={onlineRegLink} target="_blank">
              How to register online to vote
            </a>
            <br />
          </>
        )}
        <a
          className="info-link"
          href={"https://vote.gov/register/" + userStateShort}
          target="_blank"
        >
          Voter registration resources
        </a>
      </div>
    </>
  );
};
