import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
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
import { completedAction, delay } from "../functions/UserData"
import CalendarSvg from "../assets/images/Invite/Calendar.svg";
import FacebookSvg from "../assets/images/Invite/Facebook.svg";
import TwitterSvg from "../assets/images/Invite/Twitter.svg";
import InstagramSvg from "../assets/images/Invite/Instagram.svg";
import FacebookMessengerSvg from "../assets/images/Invite/FacebookMessenger.svg";
import DiscordSvg from "../assets/images/Invite/Discord.svg";
import WhatsAppSvg from "../assets/images/Invite/WhatsApp.svg";
import EmailSvg from "../assets/images/Invite/Email.svg";
import TextSvg from "../assets/images/Invite/Text.svg";
import Instagram from "./Instagram";

function Invite({ toggleInvite , isShare}) {
  const { currentUser } = useAuth();
  const [ url, setUrl ] = useState(null);
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    toggleInvite.current = changeShow;
    if (currentUser) {
      generateUrl();
    }
  }, []);

  function changeShow() {
    setShow(!show);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(shareUrl);
  }

  function reloadPage() {
    window.location.reload();
  }
  function generateUrl() {
    setUrl(`${window.location.origin}/share/${currentUser.uid}`)
  }

  // shareUrl is currently a temporary placeholder for UID link
  const shareUrl = url;
  const quote = "Help me in my 8by8 Challenge to #stopasianhate";
  const hashtag = "#stopasianhate";
  // facebook developer app id (for now its from a personal account for testing)
  const appId = "217424673873884";
  // temporary email body text
  const body = "Use this link to " + quote;

  const toggleIG = React.useRef();

  return (
    <div className="invite-wrapper">
      <nav className={show ? "invite-menu active" : "invite-menu"}>
        <li className="invite-toggle">
          <Nav.Link to="#" id="close-icon">
            <MdIcons.MdClose onClick={()=>{changeShow(); reloadPage()}} />
          </Nav.Link>
          <span className="invite-title">{isShare ? 'Share' : 'Invite Friends'}</span>
        </li>

        <div className="info">
          <img src={CalendarSvg} width="225px" />
          <p>
            {isShare ?
            'Share about your action. Invite friends to help Yang’s challenge and learn more about the 8by8 cause! If you are curious, preview what they’ll see.' :
            'Invite friends to support your challenge by registering to vote, get election reminders or take the 8by8 challenge themselves.'
            }
          </p>
        </div>

        <div className="section social-media">
          <p className="sub-heading">{isShare ? 'Social Media' : 'Copy your unique link'}</p>
          <FacebookShareButton url={shareUrl} quote={quote} hashtag={hashtag}
              onShareWindowClose={()=>{completedAction("share challenge")}}>
            <img className="invite-icon" src={FacebookSvg} />
            <p className="invite-icon-label">Facebook</p>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={quote} 
            onShareWindowClose={()=>{completedAction("share challenge")}}>
            <img className="invite-icon" src={TwitterSvg} />
            <p className="invite-icon-label">Twitter</p>
          </TwitterShareButton>

          <button className="instagram-button" onClick={() => {
            if (navigator.clipboard) {
              copyToClipboard();
            }
            toggleIG.current();
          }}>
            <img className="invite-icon" src={InstagramSvg} />
            <p className="invite-icon-label">Instagram</p>
          </button>
        </div>

        <div className="section messaging">

          <p className="sub-heading">{isShare ? 'Messaging' : 'Copy your unique link'}</p>
          <FacebookMessengerShareButton url={shareUrl} appId={appId} onShareWindowClose={()=>{completedAction("share challenge")}}>
            <img className="invite-icon" src={FacebookMessengerSvg} />
            <p className="invite-icon-label">Messenger</p>
          </FacebookMessengerShareButton>

          <WhatsappShareButton url={shareUrl} title={quote} onShareWindowClose={()=>{completedAction("share challenge")}}>
            <img className="invite-icon" src={WhatsAppSvg}/>
            <p className="invite-icon-label">WhatsApp</p>
          </WhatsappShareButton>

          <EmailShareButton url={shareUrl} subject={quote} body={body} beforeOnClick={()=>{completedAction("share challenge")}}>
            <img className="invite-icon" src={EmailSvg} />
            <p className="invite-icon-label">Email</p>
          </EmailShareButton>
          
          <button className="sms-button" onClick={() => window.open('sms:&body=' + body + ' ' + shareUrl)}>
            <img className="invite-icon" src={TextSvg} />
            <p className="invite-icon-label">Text</p>
          </button>
        </div>

        <div className="section copy-link">
          <p className="sub-heading">Copy your unique link</p>
          <div className="link-container">

            <div className="unique-link">
              <p>{shareUrl}</p>
              <div className="underline"></div>
            </div>
            <button onClick={() => {
              if (navigator.clipboard) {
                copyToClipboard(); 
                completedAction("share challenge")}
            }}>COPY</button>
          </div>
          
        </div>
      </nav>
      <Instagram toggleIG={toggleIG} isShare={isShare} shareUrl={shareUrl} />
    </div>
  );
}

export default Invite;