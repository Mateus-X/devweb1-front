"use client";
import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { Upload, UploadProps as AntUploadProps, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../styles.module.css";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
  label?: string;
  showErrorMessage?: boolean;
}

type FileInputProps = Omit<AntUploadProps, "fileList"> & {
  value?: any;
};

export function ControlledFileInput<T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
  showErrorMessage = true,
  ...fileInputProps
}: Props<T> & FileInputProps) {
  return (
    <div className={styles.controlledInputContainer}>
      {label && (
        <label
          className={errorMessage ? `${styles.errorLabel}` : `${styles.label}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className={styles.inputContainer}>
            <Upload
              className={
                errorMessage ? `${styles.errorInput}` : `${styles.fileInput}`
              }
              id={name}
              fileList={value ? [value] : []}
              accept=".jpg,.png"
              beforeUpload={(file) => {
                onChange(file);
                return false;
              }}
              onRemove={() => onChange(null)}
              {...fileInputProps}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
        )}
      />
      {errorMessage && showErrorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
}
