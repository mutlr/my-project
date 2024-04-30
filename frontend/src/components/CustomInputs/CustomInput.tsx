import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import "./CustomInput.css";

interface CustomInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  type?: string;
  errors?: FieldErrors;
}
const CustomInput = <T extends FieldValues>({
  register,
  name,
  placeholder,
  type = "text",
  errors,
}: CustomInputProps<T>) => {
  const labelValue =
    name.charAt(0).toLocaleUpperCase() + name.substring(1, name.length);
  const errorMessage = errors && errors[name]?.message;
  return (
    <div className="input-container">
      <label htmlFor={name}>{labelValue}</label>
      <input
        {...register(name)}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`formInput ${errorMessage ? "error" : ""}`}
      />
      <p
        style={{ visibility: errorMessage ? "visible" : "hidden" }}
        className="input-container-error"
      >
        {errorMessage ? errorMessage.toString() : "Hidden"}
      </p>
    </div>
  );
};

export default CustomInput;
