import PopupModal from "@/components/utils/popup-modal";

type SignoutModalProps = {
  hideSignoutModal: () => void;
}

export default function SignoutModal({hideSignoutModal} : SignoutModalProps) {
  return (
    <PopupModal
      scroll
      hideModal={hideSignoutModal}
      theme={"theme1"}
    >
      <div className="b2">Are you sure you want to sign out?</div>
      <div className="buttons">
        <a href="/signout">
          <button
            className="gradient small"
            onClick={hideSignoutModal}
          >
            <span>Yes, but I&apos;ll be back</span>
          </button>
        </a>
      </div>
      <div className="buttons">
        <button
          className="text-gradient small"
          onClick={hideSignoutModal}
        >
          <span>No, I think I&apos;ll stay</span>
        </button>
      </div>
    </PopupModal>
        
  )
}