"use client";
import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import InputMask from "react-input-mask";
import { Input, InputProps as AntInputProps } from "antd";
import styles from "../styles.module.css";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
  label?: string;
  clearButton?: boolean;
  mask: string;
}

type InputProps = Omit<AntInputProps, 'size'> & {
  value?: string;
};

export function MaskedControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  clearButton,
  errorMessage,
  mask,
  ...inputProps
}: Props<T> & InputProps) {

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
            <InputMask mask={mask} value={value} onChange={onChange} onBlur={onBlur}>
              {() => (
                <Input
                  className={errorMessage ? `${styles.errorInput}` : `${styles.input}`}
                  id={name}
                  {...inputProps}
                />
              )}
            </InputMask>
          </div>
        )}
      />
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}
