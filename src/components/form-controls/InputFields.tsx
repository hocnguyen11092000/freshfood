import * as React from "react";
import { InputHTMLAttributes } from "react";
import { Control, Controller, useController } from "react-hook-form";
import "./inputfield.scss";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  mWidth?: number | string;
  mHeight?: number | string;
  type?: string;
  noerror?: boolean;
}

export function InputField({
  name,
  control,
  label,
  type,
  placeholder,
  mWidth,
  mHeight,
  noerror,
}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <>
          <input
            className="input"
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            placeholder={placeholder}
            style={{ minWidth: mWidth, minHeight: mHeight }}
            required
            type={type}
          />
          {!noerror && (
            <div
              style={{ paddingTop: "5px", fontSize: "0.8rem", color: "red" }}
            >
              {error?.message}
            </div>
          )}
        </>
      )}
    ></Controller>
  );
}
