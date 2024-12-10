"use client";
import { ReactNode } from "react";
import styles from "./styles.module.css";

interface ModalRootProps {
  children: ReactNode;
  onClick: () => void;
}

export function ModalRoot({ children, onClick }: ModalRootProps) {
  const handleCloseModal = (e: any) => {
    if (e.target.className === styles.modalBackground) {
      onClick();
    }
  };

  return (
    <div className={styles.modalBackground} onClick={handleCloseModal}>
      <div className={styles.modalContainer}>{children}</div>
    </div>
  );
}
