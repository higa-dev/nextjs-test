import React from "react";
import styles from "./modal.module.scss";

type ModalProps = {
  close: (e: any) => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = props => {
  return (
    <div className={styles.modal} onClick={props.close}>
      <div onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;