"use client";
import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { DatePicker, DatePickerProps as AntDatePickerProps } from "antd";
import styles from "../styles.module.css";
import ptBR from 'antd/es/date-picker/locale/pt_BR';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
  label?: string;
}

type InputDatePickerProps = Omit<AntDatePickerProps, 'value' | 'onChange'>;

export function ControlledDatePickerInput<T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
  ...datePickerProps
}: Props<T> & InputDatePickerProps) {

  return (
    <div className={styles.controlledInputContainer}>
      {
        label && (
          <label className={errorMessage ? `${styles.errorLabel}` : `${styles.label}`} htmlFor={name}>
            {label}
          </label>
        )
      }
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className={styles.inputContainer}>
            <DatePicker
              className={errorMessage ? `${styles.errorInput}` : `${styles.input}`}
              id={name}
              value={value}
              locale={ptBR}
              format={"DD/MM/YYYY"}
              onChange={(date) => onChange(date)}
              {...datePickerProps}
            />
          </div>
        )}
      />
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}