"use client";
import { Icon } from "@iconify/react";
import styles from "./styles.module.css";

interface ModalHeaderProps {
  title?: string;
  onClick?: () => void;
}

export function ModalHeader({ title, onClick }: ModalHeaderProps) {
  return (
    <div className={styles.modalContainerHeader}>
      {title && <p>{title}</p>}
      {onClick && <Icon icon="mdi:close" width={24} className={styles.icon} color="#000" onClick={onClick} />}
    </div>
  );
}
