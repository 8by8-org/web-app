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
import ModalImage from "../assets/images/challenge-popup/modal_image.png";
import './ChallengePagePopup.css'


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
      <Modal show={props.show} onHide={closePopup}>
        <Modal.Body>  
          <img className="img-responsive d-block mx-auto" src={ModalImage} 
          alt="#StopAsianHate. Take the 8by8 challenge by registering to vote - and enjoy
          free food from sponsor restaurants."/>
          <p className="modal-image-description">“I’m taking on the #8by8Challenge! 
             Help me complete this challenge by registering to vote or spreading the word. 
            Visit my link to take action. Together we can #StopAsianHate. 
            Learn more at <a href="https://www.8by8.us/">8by8.us.</a>”</p>
          <p className="modal-primary text-center">Share this post at</p>
          <div className="d-flex justify-content-center">
            <WhatsappShareButton id="modal-icon"
              url={shareButtonData.url}
              title={shareButtonData.title}
              separator={shareButtonData.separator}
            >
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>

            <FacebookShareButton id="modal-icon"
              url={shareButtonData.url}
              quote={shareButtonData.body}
              hashtag={shareButtonData.hashtag}
            >
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>

            <TwitterShareButton id="modal-icon"
              url={shareButtonData.url}
              title={shareButtonData.title}
              via={shareButtonData.twitterAccount}
              hashtags={shareButtonData.hashtags}
            >
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>

            <EmailShareButton id="modal-icon"
              url={shareButtonData.url}
              subject={shareButtonData.title}
              body={shareButtonData.body}
              separator={shareButtonData.separator}
            >
              <EmailIcon size={40} round={true} />
            </EmailShareButton>
          </div>
          <p className="modal-secondary">Or share your unique link</p>
          <div className="d-flex justify-content-center">
            <button className="btn modal-link-btn" onClick={copyToClipboard}>
              <span className="modal-link d-block-inline" ref={linkEl}>https://8by8.com/share/..</span>
              <span className="modal-link-copy d-block-inline">Copy</span>
            </button>
          </div>
        </Modal.Body>  
      </Modal>
  );
}
