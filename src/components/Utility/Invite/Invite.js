import React, { useState, useEffect } from "react";
import { useAuth } from "./../../../contexts/AuthContext";
import { Nav } from "react-bootstrap";
import "./Invite.scss";
import * as MdIcons from "react-icons/md";
import {
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share"; //FacebookShareButton, FacebookMessengerShareButton
import { completedAction, getUserDatabase } from "./../../../functions/UserData";
import CalendarSvg from "../../../assets/images/Invite/Calendar.svg";
// import FacebookSvg from "../../../assets/images/Invite/Facebook.svg";
import TwitterSvg from "../../../assets/images/Invite/Twitter.svg";
import InstagramSvg from "../../../assets/images/Invite/Instagram.svg";
// import FacebookMessengerSvg from "../../../assets/images/Invite/FacebookMessenger.svg";
import WhatsAppSvg from "../../../assets/images/Invite/WhatsApp.svg";
import EmailSvg from "../../../assets/images/Invite/Email.svg";
import TextSvg from "../../../assets/images/Invite/Text.svg";
import Instagram from "./Instagram/Instagram";
import Preview from "./Preview";
import Notification from "./../../Notification/Notification";

function Invite({ toggleInvite, isShare, challengeWon }) {
  const { currentUser } = useAuth();
  const [url, setUrl] = useState(null);
  const [show, setShow] = useState(false);
  const [challengerInfo, setChallengerInfo] = useState(null);
  const [shared, setShared] = useState(false);
  const [copyNotif, setCopyNotif] = useState(false);

  useEffect(() => {
    toggleInvite.current = changeShow;
    function generateUrl() {
      if (isShare) {
        setUrl(
          `${window.location.origin}/share/${
            JSON.parse(localStorage.getItem("challengerInfo")).challengerID
          }`
        );
      } else {
        if (challengeWon) {
          setUrl(`${window.location.origin}/challengerwelcome`);
        } else {
          setUrl(`${window.location.origin}/share/${currentUser.uid}`);
        }
      }
    }

    if (localStorage.getItem("challengerInfo")) {
      setChallengerInfo(JSON.parse(localStorage.getItem("challengerInfo")));
    }

    if (currentUser) {
      generateUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShare, currentUser]);

  const shareUrl = url;
  const body = isShare
    ? "I’m supporting " +
      JSON.parse(localStorage.getItem("challengerInfo")).name +
      "'s 8by8 Challenge!"
    : challengeWon
    ? "I won the 8by8 Challenge!"
    : "Help me in my 8by8 Challenge to #stopasianhate.";
  // const hashtag = "#stopasianhate";
  // const appId = "217424673873884";

  useEffect(() => {
    if (currentUser) {
      getUserDatabase().then((data) => {
        if (data.sharedChallenge) {
          setShared(true);
        }

        // when challenge is complete
        if (data.badges.length >= 8) {
        }
      });
    }
  }, [currentUser]);

  // Creates the url to be shared. If isShare is true(for share on actions page) then use the uid of the challenger info in local storage, else use the
  // uid of the person logged in(for invite on progress page).
  function changeShow() {
    setShow(!show);
  }

  // Copys the url thats to be shared into the clipboard.
  function copyToClipboard() {
    navigator.clipboard.writeText(shareUrl);
  }

  // Reload the current page(only on invite pop-up).
  function reloadPage() {
    if (!shared && !isShare) {
      window.location.reload();
    }
  }

  const toggleIG = React.useRef();
  const togglePreview = React.useRef();

  return (
    <div className="invite-wrapper">
      <nav className={show ? "invite-menu active" : "invite-menu"}>
        <li className="invite-toggle">
          <Nav.Link to="#" id="close-icon">
            <MdIcons.MdClose
              onClick={() => {
                changeShow();
                reloadPage();
              }}
            />
          </Nav.Link>
          <span className="invite-title">
            {!challengeWon && (isShare ? "Share" : "Invite Friends")}
          </span>
        </li>

        {!challengeWon && (
          <div className="info">
            <img src={CalendarSvg} width="225px" alt="Calender Icon" />

            {isShare ? (
              <p>
                Share about your action. Invite friends to help{" "}
                {challengerInfo && challengerInfo.name}’s challenge and learn more
                about the 8by8 cause! If you are curious,
                <button
                  className="preview-button"
                  onClick={() => togglePreview.current()}
                >
                  preview
                </button>{" "}
                what they’ll see.
              </p>
            ) : (
              <p>
                Invite friends to support your challenge by registering to vote,
                get election reminders or take the 8by8 challenge themselves. If
                you are curious,{" "}
                <button
                  className="preview-button"
                  onClick={() => togglePreview.current()}
                >
                  preview
                </button>{" "}
                what they’ll see.
              </p>
            )}
          </div>
        )}

        <div className="section social-media">
          <p className="sub-heading">Social Media</p>
          {/* <FacebookShareButton url={shareUrl} quote={body} hashtag={hashtag}
              onShareWindowClose={()=>{completedAction("share challenge")}}>
            <img className="invite-icon" src={FacebookSvg} alt="Facebook Icon" />
            <p className="invite-icon-label">Facebook</p>
          </FacebookShareButton> */}

          <TwitterShareButton
            url={shareUrl}
            title={body}
            onShareWindowClose={() => {
              completedAction("share challenge");
            }}
          >
            <img className="invite-icon" src={TwitterSvg} alt="Twitter Icon" />
            <p className="invite-icon-label">Twitter</p>
          </TwitterShareButton>

          <button
            className="instagram-button"
            onClick={() => {
              if (navigator.clipboard) {
                copyToClipboard();
              }
              toggleIG.current();
            }}
          >
            <img
              className="invite-icon"
              src={InstagramSvg}
              alt="Instagram Icon"
            />
            <p className="invite-icon-label">Instagram</p>
          </button>
        </div>

        <div className="section messaging">
          <p className="sub-heading">Messaging</p>
          {/*<FacebookMessengerShareButton
            url={shareUrl}
            appId={appId}
            onShareWindowClose={() => {
              completedAction("share challenge");
            }}
            redirectUri={"https://challenge.8by8.us/signin"}
          >
            <img className="invite-icon" src={FacebookMessengerSvg} alt="Facebook Icon" />
            <p className="invite-icon-label">Messenger</p>
          </FacebookMessengerShareButton> */}

          <WhatsappShareButton
            url={shareUrl}
            title={body}
            onShareWindowClose={() => {
              completedAction("share challenge");
            }}
          >
            <img
              className="invite-icon"
              src={WhatsAppSvg}
              alt="WhatsApp Icon"
            />
            <p className="invite-icon-label">WhatsApp</p>
          </WhatsappShareButton>

          <EmailShareButton
            url={shareUrl}
            subject={body}
            body={body}
            beforeOnClick={() => {
              completedAction("share challenge");
            }}
          >
            <img className="email-icon" src={EmailSvg} alt="Email Icon" />
            <p className="invite-icon-label">Email</p>
          </EmailShareButton>

          <button
            className="sms-button"
            onClick={() => window.open("sms:&body=" + body + " " + shareUrl)}
          >
            <img className="text-icon" src={TextSvg} alt="Text Icon" />
            <p className="invite-icon-label">Text</p>
          </button>
        </div>

        <div className="section copy-link">
          <p className="sub-heading">
            {isShare
              ? `Copy ${challengerInfo && challengerInfo.name}’s Unique Link`
              : "Copy your unique link"}
          </p>
          <div className="link-container">
            <div className="unique-link">
              <p>{shareUrl}</p>
              <div className="underline"></div>
            </div>
            <button
              onClick={() => {
                setCopyNotif(!copyNotif);

                if (navigator.clipboard) {
                  copyToClipboard();
                  completedAction("share challenge");
                }
              }}
            >
              COPY
            </button>
          </div>
        </div>
      </nav>

      <Preview togglePreview={togglePreview} isShare={isShare} />
      <Instagram toggleIG={toggleIG} isShare={isShare} shareUrl={shareUrl} />

      <Notification text={"Link Copied!"} enable={copyNotif} />
    </div>
  );
}

export default Invite;
