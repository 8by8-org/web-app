import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "./Invite.scss";
import "./Instagram.scss";
import * as MdIcons from "react-icons/md";
import igpost1 from "../assets/images/Invite/igpost1.png";
import igpost2 from "../assets/images/Invite/igpost2.png";
import igpost3 from "../assets/images/Invite/igpost3.png";
import igpostchallenger from "../assets/images/Invite/igpostchallenger.png";
import igpostplayer from "../assets/images/Invite/igpostplayer.png";
import {completedAction} from "../functions/UserData";

function Instagram({ toggleIG, isShare, shareUrl }) {
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    toggleIG.current = changeShow;
  }, []);

  function changeShow() {
    setShow(!show);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(shareUrl);
  }

  const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());

  const quote = "Help me in my 8by8 Challenge to #stopasianhate";
  const hashtag = "#stopasianhate";
  // facebook developer app id (for now its from a personal account for testing)
  const appId = "217424673873884";
  // temporary email body text
  const body = "Use this link to " + quote;

  const [popupVisible, togglePopupVisible] = useState(false);
  const togglePopup = () => {
      togglePopupVisible(!popupVisible);
  }

  return (
    <div className="invite-wrapper">
      <nav className={show ? "invite-menu active" : "invite-menu"}>
        <li className="invite-toggle">
          <Nav.Link to="#" id="close-icon">
            <MdIcons.MdClose onClick={changeShow} />
          </Nav.Link>
          <span className="invite-title">Instagram</span>
        </li>

        <div className="info">
          <p>
            <span className="bold-text">{mobile ? 'Long press' : 'Right click'} on sharable 8by8 images below</span> to save them to your device.
            <span className="bold-text"> Copy the invite link</span> below to include in your Instagram post or story to invite friends!
          </p>
        </div>

        <div className="img-container">
            <img src={igpost1} />
            <img src={igpost2} />
            <img src={igpost3} />
            <img src={isShare ? igpostplayer : igpostchallenger} />
        </div>

        <button className="gradient"
        onClick={() => {
          if (mobile) {
            window.open("https://www.instagram.com/8by8vote/", "_self")
            completedAction("share challenge");
          } else {
            window.open("https://www.instagram.com/8by8vote/", "_blank")
            completedAction("share challenge");
          }
        }}
        >
          GO TO INSTAGRAM
        </button>

        <div className="copy-link-again">
          <span className="link" onClick={() => {
            if (navigator.clipboard) {
              copyToClipboard();
              completedAction("share challenge");
            }
          }}>
            Copy Invite Link Again
          </span>
        </div>
      </nav>

     </div>
  );
}

export default Instagram;
