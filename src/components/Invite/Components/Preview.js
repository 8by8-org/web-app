import React, { useState } from "react";
import { Nav } from "react-bootstrap";

import PreviewBordorSvg from "../../../assets/images/Invite/PreviewBordor.svg";
import PlayerWelcome from "../../PlayerWelcome"
import * as MdIcons from "react-icons/md";
import "./Preview.scss";

function Preview({ togglePreview , isShare}) {
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    togglePreview.current = changeShow;
  }, []);

  function changeShow() {
    setShow(!show);
  }

  return (
    <div className={show ? "preview-wrapper active" : "preview-wrapper"}>
      <div className="preview-header">
        <Nav.Link to="#" id="close-icon">
          <MdIcons.MdClose onClick={changeShow} />
        </Nav.Link>
        <span className="invite-title">Preview</span>
      </div>

      <div className="view">
        <img src={PreviewBordorSvg} className="preview-bordor" alt="Preview Bordor" />
        <div className="playerwelcome-page">
          <PlayerWelcome isShare={isShare} />
        </div>
      </div>
    </div>
  );
}

export default Preview;
