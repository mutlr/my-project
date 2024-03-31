import React from "react";
import './Button.css';
import { ColorList } from "../../styles";

type ButtonTypes = 'submit' | 'reset' | 'button';
type Colors = 'primary' | 'secondary' | 'red' | 'light';
interface ButtonProps  {
    text: string,
    color?: Colors,
    onClick?: () => void,
    type?: ButtonTypes,
    style?: React.CSSProperties,
}


const Button = ({ text, color, onClick, type = 'button', style, }: ButtonProps) => {
    const backgroundStyle = {
        backgroundColor: ColorList[color || 'secondary'],
        display: 'inline-flex',
    };
    return (
        <button type={type} className="buttonContainer" style={{ ...backgroundStyle, ...style }} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;