"use client";
import React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { Input, InputProps as AntInputProps } from "antd"; // Importando o Input do Ant Design
import styles from "../styles.module.css";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
  label: string;
}

// Definindo o tipo InputProps baseado nas propriedades do Ant Design
type InputProps = Omit<AntInputProps, "size"> & {
  value?: string;
};

export function ControlledPasswordInput<T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
  ...inputProps
}: Props<T> & InputProps) {
  return (
    <div className={styles.controlledInputContainer}>
      <label className={errorMessage ? `${styles.errorLabel}` : `${styles.label}`} htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <div className={styles.inputContainer}>
            <Input.Password
              className={errorMessage ? `${styles.errorInput}` : `${styles.passwordInput}`}
              id={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              visibilityToggle={true}
              {...inputProps}
            />
          </div>
        )}
      />
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}
