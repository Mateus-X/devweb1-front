import React from "react";
import styles from "./styles.module.css";

interface HiperlinkProps {
  text: string;
  onClick: () => void;
  variant?: Variant;
}

type Variant = "primary" | "secondary";

export function Hiperlink({
  text,
  onClick,
  variant = "primary",
}: HiperlinkProps) {
  const className = styles[variant];
  return (
    <span
      className={className}
      onClick={onClick}
    >
      {text}
    </span>
  );
}
