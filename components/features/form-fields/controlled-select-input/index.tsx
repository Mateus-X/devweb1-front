"use client";
import React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { Select, SelectProps as AntSelectProps } from "antd";
import styles from "../styles.module.css";

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    errorMessage?: string;
    label?: string;
    showErrorMessage?: boolean;
}

type SelectProps = Omit<AntSelectProps, "size"> & {
    value?: string;
};

export function ControlledSelectInput<T extends FieldValues>({
    name,
    control,
    label,
    errorMessage,
    showErrorMessage = true,
    ...selectProps
}: Props<T> & SelectProps) {
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
                        <Select
                            className={errorMessage ? `${styles.errorInput}` : `${styles.selectInput}`}
                            id={name}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            style={{ width: "100%" }}
                            {...selectProps}
                        />
                    </div>
                )}
            />
            {errorMessage && showErrorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
        </div>
    );
}