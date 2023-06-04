import { useRef, useEffect, PropsWithChildren } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from '@/styles/modules/components/utils/popup-modal.module.scss';

type PopupModalProps = PropsWithChildren & {
  ariaLabel:string;
  theme: "dark" | "light";
  isOpen:boolean;
  closeModal:() => void;
};

export default function PopupModal ({ariaLabel, theme, isOpen, closeModal, children}:PopupModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if(isOpen) {
      if(dialog.current && !dialog.current.hasAttribute('open')) {
        dialog.current.showModal();
        dialog.current.focus();
      }
    } else {
      dialog.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      tabIndex={0}
      aria-label={ariaLabel}
      className={styles[`popup_modal_${theme}_theme`]} ref={dialog}
    >
        <div className={theme}>
          <div className={styles.close_btn_container}>
            <button
              className={styles.close_btn}
              aria-label="close modal"
              onClick={closeModal}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
    </dialog>
  );
}