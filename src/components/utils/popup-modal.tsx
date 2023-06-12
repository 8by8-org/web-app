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
      aria-label={ariaLabel}
      role="dialog"
      className={styles[`popup_modal_${theme}_theme`]} ref={dialog}
      onKeyDown={(event) => {
        if(event.key === 'Escape') {
          event.preventDefault();
          closeModal();
        }
      }}
    >
      <div>
        <div className={styles.close_btn_container}>
          <button
            className={styles.close_btn}
            aria-label="close dialog"
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