import React, { ReactElement, ReactNode, Ref } from "react";
import "./Togglable.css";
import { useImperativeHandle, forwardRef } from "react";
import Button from "../Button/Button";
import useVisibility from "../../hooks/useVisibility";
interface Props {
  children: ReactNode | ReactElement;
  buttonText: string;
}

export interface TogglableProps {
  toggleVisibility: () => void;
}
const Togglable = forwardRef((props: Props, ref: Ref<TogglableProps>) => {
  const { isOpen, toggleVisibility } = useVisibility();

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  Togglable.displayName = "Togglable";

  return (
    <>
      <div style={{ display: isOpen }}>{props.children}</div>
      <Button
        onClick={toggleVisibility}
        text={isOpen === "" ? "Close" : props.buttonText}
        className={isOpen === "" ? "activatedTogglebaleBtn" : "togglableBtn"}
        color="light"
      />
    </>
  );
});

export default Togglable;
