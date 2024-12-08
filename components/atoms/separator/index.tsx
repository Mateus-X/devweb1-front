"use client";
import { ReactNode } from "react";
import styles from "./styles.module.css";

interface SeparatorProps {
  label?: ReactNode;
  variant?: Variant;
}

type Variant = "primary" | "texted";

export function Separator({
    label,
  variant = "primary",
}: SeparatorProps) {
  const className = styles[variant];

  return (
    <div className={className}>
      {variant === "texted" && <span>{label}</span>}
    </div>
  );
}
