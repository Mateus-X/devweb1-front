"use client";
import { ReactNode } from "react";
import styles from "./styles.module.css";

interface ModalFooterProps {
  children: ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return <div className={styles.modalContainerFooter}>{children}</div>;
}
