import React from "react";
import styles from "./modal.module.scss";

type ModalProps = {
  close: (e: any) => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = props => {
  const handleClose = (e: any) => {
    props.close(e);
  };

  const handleCloseButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose(e);
  };

  return (
    <div className={styles.modal} onClick={handleClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        {props.title && (
          <header>
            <div className="flex items-stretch">
              <div className="py-4 flex-1">
                <p>{props.title}</p>
              </div>
              <div className="py-4 justify-end">
                <button
                  type="button"
                  className="bg-white dark:bg-black rounded-md p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={handleCloseButton}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </header>
        )}
        <div>
          {props.children}
        </div>
        <footer></footer>
      </div>
    </div>
  );
};

export default Modal;