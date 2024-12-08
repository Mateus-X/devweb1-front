"use client";
import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { Input, InputProps as AntInputProps } from "antd";
import styles from "../styles.module.css";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
  label?: string;
  clearButton?: boolean;
  showErrorMessage?: boolean;
}

type InputProps = Omit<AntInputProps, 'size'> & {
  value?: string;
};

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  clearButton,
  errorMessage,
  showErrorMessage = true,
  ...inputProps
}: Props<T> & InputProps) {
  const handleClear = () => {
    control._reset({ [name as string]: "" } as T);
  };

  return (
    <div className={styles.controlledInputContainer}>
      {label && (
        <label className={errorMessage ? `${styles.errorLabel}` : `${styles.label}`} htmlFor={name}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <div className={styles.inputContainer}>
            <Input
              className={errorMessage ? `${styles.errorInput}` : `${styles.input}`}
              id={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              {...inputProps}
            />
            {clearButton && <p onClick={handleClear}>X</p>}
          </div>
        )}
      />
      {errorMessage && showErrorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}
