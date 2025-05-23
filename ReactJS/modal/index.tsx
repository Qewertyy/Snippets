import type React from "react";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./.module.css";
import CloseIcon from "./icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backdropFilter?: string;
  title?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  disableClose?: boolean;
  styles?: {
    modalOverlay?: React.CSSProperties;
    modalContent?: React.CSSProperties;
    modalHeader?: React.CSSProperties;
    modalTitle?: React.CSSProperties;
    closeButton?: React.CSSProperties;
    modalBody?: React.CSSProperties;
  };
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  backdropFilter = "blur(5px) brightness(80%)",
  title,
  width,
  maxWidth,
  height,
  disableClose = false,
  styles: customStyles = {},
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        const isClickOnOverlay =
          event.target === modalRef.current?.parentElement;
        if (isClickOnOverlay) onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayStyle = {
    ...customStyles.modalOverlay,
    backdropFilter: backdropFilter || "none",
  };

  const contentStyle = {
    ...customStyles.modalContent,
    width: width || "100%",
    height: height || "auto",
    maxWidth: maxWidth || "500px",
  };

  return ReactDOM.createPortal(
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.open : ""}`}
      style={overlayStyle}
    >
      <div ref={modalRef} className={styles.modalContent} style={contentStyle}>
        <div
          className={styles.modalHeader}
          data-place-end={title ? false : true}
          style={customStyles.modalHeader}
        >
          {title && (
            <h2 className={styles.modalTitle} style={customStyles.modalTitle}>
              {title}
            </h2>
          )}
          {!disableClose && (
            <span
              className={styles.closeButton}
              onClick={onClose}
              style={customStyles.closeButton}
            >
              <CloseIcon width={30} />
            </span>
          )}
        </div>
        <div className={styles.modalBody} style={customStyles.modalBody}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
