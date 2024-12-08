import { ReactNode } from "react";
import styles from "./styles.module.css";

interface ModalBodyProps {
  children: ReactNode;
}

export function ModalBody({ children }: ModalBodyProps) {
  return <div className={styles.modalContainerBody}>{children}</div>;
}
