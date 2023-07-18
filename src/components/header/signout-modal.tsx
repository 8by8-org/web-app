import { useContext } from "react";
import { HeaderContext } from "./header-context";
import PopupModal from '../utils/popup-modal';
import styles from '@/styles/modules/components/header/signout-modal.module.scss';

export default function SignoutModal() {
  const {isSignoutModalShown, closeSignoutModal} = useContext(HeaderContext);

  return (
    <PopupModal 
      ariaLabel="Are you sure you want to sign out?"
      theme="dark" 
      isOpen={isSignoutModalShown} 
      closeModal={closeSignoutModal}>
      <p className="b1">Are you sure you want to sign out?</p>
      <button
        className={styles.btn_top}
        onClick={closeSignoutModal}
      >
          <span>Yes, but I&apos;ll be back</span>
      </button>
      <button
          className={styles.btn_bottom}
          onClick={closeSignoutModal}
      >
          <span>No, I think I&apos;ll stay</span>
      </button>
    </PopupModal>
  );
}