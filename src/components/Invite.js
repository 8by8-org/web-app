import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "./Invite.scss";
import * as MdIcons from "react-icons/md";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import CalendarSvg from "../assets/images/Invite/Calendar.svg";
import FacebookSvg from "../assets/images/Invite/Facebook.svg";
import TwitterSvg from "../assets/images/Invite/Twitter.svg";
import InstagramSvg from "../assets/images/Invite/Instagram.svg";
import FacebookMessengerSvg from "../assets/images/Invite/FacebookMessenger.svg";
import DiscordSvg from "../assets/images/Invite/Discord.svg";
import WhatsAppSvg from "../assets/images/Invite/WhatsApp.svg";
import EmailSvg from "../assets/images/Invite/Email.svg";
import TextSvg from "../assets/images/Invite/Text.svg";

function Invite({ toggleInvite }) {
  const [show, setShow] = useState(false);
  React.useEffect(() => {
    toggleInvite.current = changeShow;
  }, []);

  function changeShow() {
    setShow(!show);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(shareUrl);
  }

  // shareUrl is currently a temporary placeholder for UID link
  const shareUrl = "www.8by8.us";
  const quote = "Help me in my 8by8 Challenge to #stopasianhate";
  const hashtag = "#stopasianhate";
  // facebook developer app id (for now its from a personal account for testing)
  const appId = "217424673873884";
  // temporary email body text
  const body = "Use this link to " + quote;

  return (
    <div className="invite-wrapper">
      <nav className={show ? "invite-menu active" : "invite-menu"}>
        <li className="invite-toggle">
          <Nav.Link to="#" id="close-icon">
            <MdIcons.MdClose onClick={changeShow} />
          </Nav.Link>
          <span className="invite-title">Invite Friends</span>
        </li>

        <div className="info">
          <img src={CalendarSvg} width="225px" />
          <p>
            Invite friends to support your challenge by registering to vote, get
            election reminders or take the 8by8 challenge themselves.
          </p>
        </div>

        <div className="section social-media">
          <p className="sub-heading">Copy your unique link</p>
          <FacebookShareButton url={shareUrl} quote={quote} hashtag={hashtag}>
            <img className="invite-icon" src={FacebookSvg} />
            <p className="invite-icon-label">Facebook</p>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={quote}>
            <img className="invite-icon" src={TwitterSvg} />
            <p className="invite-icon-label">Twitter</p>
          </TwitterShareButton>
        </div>

        <div className="section messaging">
          <p className="sub-heading">Copy your unique link</p>
          <FacebookMessengerShareButton url={shareUrl} appId={appId}>
            <img className="invite-icon" src={FacebookMessengerSvg} />
            <p className="invite-icon-label">Messenger</p>
          </FacebookMessengerShareButton>

          <WhatsappShareButton url={shareUrl} title={quote}>
            <img className="invite-icon" src={WhatsAppSvg} />
            <p className="invite-icon-label">WhatsApp</p>
          </WhatsappShareButton>

          <EmailShareButton url={shareUrl} subject={quote} body={body}>
            <img className="invite-icon" src={EmailSvg} />
            <p className="invite-icon-label">Email</p>
          </EmailShareButton>
        </div>

        <div className="section copy-link">
          <p className="sub-heading">Copy your unique link</p>
          <div className="link-container">
            <p>{shareUrl}</p>
            <button onClick={copyToClipboard}>COPY</button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Invite;
