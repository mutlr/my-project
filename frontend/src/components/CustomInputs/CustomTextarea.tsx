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
  errors?: FieldErrors;
}
const CustomTextarea = <T extends FieldValues>({
  register,
  name,
  placeholder,
  errors,
}: CustomInputProps<T>) => {
  const labelValue =
    name.charAt(0).toLocaleUpperCase() + name.substring(1, name.length);
  const errorMessage = errors && errors[name]?.message;
  return (
    <div className="input-container">
      {errorMessage && <p className="input-container-error">*</p>}
      <label htmlFor={name}>{labelValue}</label>
      <textarea
        {...register(name)}
        name={name}
        placeholder={placeholder}
        className={`formInput ${errorMessage ? "error" : ""}`}
      />
    </div>
  );
};

export default CustomTextarea;
