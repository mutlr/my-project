import React from "react";
import './Button.css';
import { Colors, ButtonTypes } from "../../types";
import { ColorList } from "../../styles";

interface ButtonProps  {
    text: string,
    color?: Colors,
    onClick?: () => void,
    type?: ButtonTypes,
}


const Button = ({ text, color, onClick, type = 'button' }: ButtonProps) => {
    const style = {
        backgroundColor: ColorList[color || 'secondary'],
    };
    return (
        <button type={type} className="buttonContainer" style={style} onClick={onClick}>
            <p className="buttonText" >{text}</p>
        </button>
    );
};

export default Button;