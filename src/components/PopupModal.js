import React from "react";
import "./PopupModal.scss";
import { AiOutlineClose } from "react-icons/ai";

function PopupModal(props) {
  return (
    <div className="popup-modal">
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                props.setOpenModal(false);
              }}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="content">{props.content}</div>
        </div>
      </div>
    </div>
  );
}

export default PopupModal;
