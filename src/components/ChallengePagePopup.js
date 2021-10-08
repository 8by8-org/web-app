import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

export default function ChallengePagePopup(props) {
  const linkEl = useRef(null);
  const closePopup = (e) => {
    props.togglePopup();
  };
  // Will have to check the availability of navigator on different browsers and systems
  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkEl.current.innerText);
  };
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
      <Modal show={props.show} onHide={closePopup}>
        <Modal.Header closeButton>Invite 8 Friends</Modal.Header>  
        <Modal.Body>  
          <p>Share this post at</p>
          <WhatsappShareButton
            url={shareButtonData.url}
            title={shareButtonData.title}
            separator={shareButtonData.separator}
          >
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>

          <FacebookShareButton
            url={shareButtonData.url}
            quote={shareButtonData.body}
            hashtag={shareButtonData.hashtag}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareButtonData.url}
            title={shareButtonData.title}
            via={shareButtonData.twitterAccount}
            hashtags={shareButtonData.hashtags}
          >
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>

          <EmailShareButton
            url={shareButtonData.url}
            subject={shareButtonData.title}
            body={shareButtonData.body}
            separator={shareButtonData.separator}
          >
            <EmailIcon size={40} round={true} />
          </EmailShareButton>
        </Modal.Body>  
        <Modal.Footer>
          <p ref={linkEl}>Placeholder Link</p>
          <button onClick={copyToClipboard}>Copy</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
