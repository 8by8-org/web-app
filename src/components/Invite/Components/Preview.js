import React, { useState } from "react";
import { Nav } from "react-bootstrap";

import PreviewBordorSvg from "../../../assets/images/Invite/PreviewBordor.svg";
import Header from "../../Header/Header";
import PlayerWelcome from "../../PlayerWelcome";
import Footer from "../../Footer";
import * as MdIcons from "react-icons/md";
import "./Preview.scss";

function Preview({ togglePreview , isShare}) {
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    togglePreview.current = changeShow;
  }, []);

  // Open and closes the preview pop-up.
  function changeShow() {
    setShow(!show);
  }

  return (
    <div className={show ? "preview-wrapper active" : "preview-wrapper"}>
      {/* Header */}
      <div className="preview-header">
        <Nav.Link to="#" id="close-icon">
          <MdIcons.MdClose onClick={changeShow} />
        </Nav.Link>
        <span className="invite-title">Preview</span>
      </div>

      {/* Playerwelcome preview */}
      <div className="view">
        <img src={PreviewBordorSvg} className="preview-bordor" alt="Preview Bordor" />
        <div className="playerwelcome-page">
          <Header isShare={true} />
          <PlayerWelcome isShare={isShare} />
          <Footer isShare={true} />
        </div>
      </div>
    </div>
  );
}

export default Preview;
