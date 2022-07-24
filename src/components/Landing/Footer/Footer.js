import React from "react";
import "./Footer.scss";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineInstagram,
} from "react-icons/ai";

function Footer({ isShare }) {
  // If isShare is not true then the social media buttons work.
  return (
    <div className="footer">
      <div className="icons">
        <AiFillFacebook
          onClick={() =>
            !isShare && window.open("https://www.facebook.com/8by8vote/", "_blank")
          }
        />
        <AiFillLinkedin
          onClick={() =>
            !isShare && window.open("https://www.linkedin.com/company/8by8vote/", "_blank")
          }
        />
        <AiOutlineInstagram
          onClick={() =>
            !isShare && window.open("https://www.instagram.com/8by8vote/", "_blank")
          }
        />
      </div>
      <div className="description">
        <p>Copyright © 2021</p>
        <p>
          8BY8 is a nonprofit organization dedicated to stopping hate against
          Asian American Pacific Islander communities through voter registration
          and turnout.
        </p>
      </div>
    </div>
  );
}

export default Footer;
