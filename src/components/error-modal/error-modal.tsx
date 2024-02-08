import styles from "../../styles/modules/components/error-modal/error-modal.module.scss";
import PopupModal from '../utils/popup-modal';

interface ErrorModalProps {
  isErrorModalShown:boolean;
  closeErrorModal:() => void;
}

export default function ErrorModal(props:ErrorModalProps) {
  return (
    <PopupModal 
      ariaLabel="Something went wrong."
      theme="light" 
      isOpen={props.isErrorModalShown}
      closeModal={props.closeErrorModal}
    >
      <p className={styles.heading}>Something went wrong.</p>
      <p className={styles.text}>
        Please try again later!
      </p>
      <button
        type="button"
        className={styles.ok_btn}
        onClick={props.closeErrorModal}
      >
        OK
      </button>
    </PopupModal>
  )
}