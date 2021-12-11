import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "./Invite.scss";
import * as MdIcons from "react-icons/md";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import CalandarSvg from "../assets/images/Invite/Calandar.svg";

function Invite({ toggleInvite }) {
  const [show, setShow] = useState(false);
  React.useEffect(() => {
    toggleInvite.current = changeShow;
  }, []);

  function changeShow() {
    setShow(!show);
    console.log("child got it!");
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
          <img src={CalandarSvg} />
          <p>
            Invite friends to support your challenge by registering to vote, get
            election reminders or take the 8by8 challenge themselves.
          </p>
        </div>

        <div className="social-media">
          <p className="sub-heading">Copy yout unique link</p>

          <FacebookShareButton url={shareUrl} quote={quote} hashtag={hashtag}>
            <FacebookIcon />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={quote}>
            <TwitterIcon />
          </TwitterShareButton>
        </div>

        <div className="messaging">
          <p className="sub-heading">Copy yout unique link</p>

          <FacebookMessengerShareButton url={shareUrl} appId={appId}>
            <FacebookMessengerIcon />
          </FacebookMessengerShareButton>

          <WhatsappShareButton url={shareUrl} title={quote}>
            <WhatsappIcon />
          </WhatsappShareButton>

          <EmailShareButton url={shareUrl} subject={quote} body={body}>
            <EmailIcon />
          </EmailShareButton>
        </div>

        <div className="copy-link">
          <p className="sub-heading">Copy yout unique link</p>
          <p>www.link.com</p>
          <button>COPY</button>
        </div>
      </nav>
    </div>
  );
}

export default Invite;
