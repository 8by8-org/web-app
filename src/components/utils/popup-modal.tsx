import { ForwardRefRenderFunction, PropsWithChildren, forwardRef, useImperativeHandle, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from '@/styles/modules/components/utils/popup-modal.module.scss';

type PopupModalProps = PropsWithChildren & {
  scroll:boolean;
  theme: "theme1" | "theme2";
};

type PopupModalHandle = {
  showModal:() => void;
  closeModal:() => void;
}

const PopupModal : ForwardRefRenderFunction<PopupModalHandle, PopupModalProps> = (
  {scroll, theme, children},
  ref
) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const showModal = () => {
    dialog.current?.showModal();
  }
  const closeModal = () => {
    dialog.current?.close();
  }
  useImperativeHandle(ref, () => {
    return {
      showModal,
      closeModal
    }
  });
  return (
    <dialog className={styles.popup_modal} ref={dialog} style={{zIndex: 3}}>
      <div className={scroll ? "modalBackground-scroll":"modalBackground"}>
        <div className={theme}>
          <div className="titleCloseBtn">
            <button
              onClick={closeModal}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </dialog>
  );
}

export default forwardRef(PopupModal);