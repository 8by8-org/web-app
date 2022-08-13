import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import './Popup.scss'
import { IoCloseOutline } from 'react-icons/io5'

export default function Popup(props) {
  const linkEl = useRef(null);
  const closePopup = (e) => {
    props.togglePopup();
  };
  // Will have to check the availability of navigator on different browsers and systems
  /*const copyToClipboard = () => {
    navigator.clipboard.writeText(linkEl.current.innerText);
  };*/
  function copyToClipboard() {
    navigator.clipboard.writeText(shareUrl);
  }
  // shareUrl is currently a temporary placeholder for UID link
  const shareUrl = "www.8by8.us";
  // Temporary test data for share buttons
  const shareButtonData = {
    url: "https://www.gregtanaka.org/8by8" /* shared link */,
    title: "8by8 Challenge",
    body: "By committing to the #8by8 challenge, you would get 8 of your friends, families, and acquaintances to register to vote within 8 days. By pushing the #8by8 challenge, we can #StopAsianHate.",
    separator:
      "\nClick this link to take the challenge: " /* text before link */,
    hashtag: "#8by8",
    hashtags: ["8by8", "StopAsianHate"],
    twitterAccount: "greglintanaka",
  };

  return (
    <div>
      <Modal className="popup" show={props.show} onHide={closePopup}>
        <Modal.Header>
          <IoCloseOutline className="close" onClick={closePopup} />
          <p>{props.header}</p>
        </Modal.Header>  
        <Modal.Body>  
          <p>{props.body}</p>
          <button className="challenge-button">GO TO INSTAGRAM</button>
        </Modal.Body>  
        <Modal.Footer>
        <span className="link" onClick={copyToClipboard}>
          Copy Invite Link Again
        </span>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
