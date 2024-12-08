"use client";
import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { Checkbox, CheckboxProps as AntCheckboxProps } from "antd";
import styles from "../styles.module.css";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
  label?: string;
}

type InputCheckboxProps = Omit<AntCheckboxProps, 'checked'> & {
  isChecked?: boolean;
};

export function ControlledCheckboxInput<T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
  ...checkboxProps
}: Props<T> & InputCheckboxProps) {

  return (
    <div className={styles.controlledInputContainer}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <label className={styles.checkboxLabel} htmlFor={name}>
            <Checkbox
              id={name}
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              {...checkboxProps} 
            >
              {label}
            </Checkbox>
          </label>
        )}
      />
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}
