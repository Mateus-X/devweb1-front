"use client";
import { ReactNode } from "react";
import styles from "./styles.module.css";

interface ButtonRootProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  type?: Type;
}

type Variant = "primary" | "secondary" | "tertiary" | "icon" | "bordered";

type Type = "button" | "reset" | "submit";

export function ButtonRoot({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
}: ButtonRootProps) {
  const className = styles[variant];

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
