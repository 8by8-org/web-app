import { PropsWithChildren } from "react";
import { AiOutlineClose } from "react-icons/ai";

type PopupModalProps = PropsWithChildren & {
  scroll:boolean;
  theme: "theme1" | "theme2";
  hideModal: () => void;
};

function PopupModal({scroll, theme, hideModal, children} : PopupModalProps) {
  return (
    <div className="popup-modal">
      <div className={scroll ? "modalBackground-scroll":"modalBackground"}>
        <div className={theme}>
          <div className="titleCloseBtn">
            <button
              onClick={hideModal}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default PopupModal;