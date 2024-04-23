import React from "react";
import './Button.css';
import { ColorList } from "../../styles";

type ButtonTypes = 'submit' | 'reset' | 'button';
type Colors = 'primary' | 'secondary' | 'red' | 'light' | 'spotifyGreen';
interface ButtonProps  {
    text: string,
    color?: Colors,
    onClick?: () => void,
    type?: ButtonTypes,
    style?: React.CSSProperties,
    className?: string,
}


const Button = ({ text, color, onClick, type = 'button', style, className }: ButtonProps) => {
    const backgroundStyle = {
        backgroundColor: ColorList[color || 'primary'],
        display: 'inline-flex',
    };
    return (
        <button type={type} className={`customButton ${className}`} style={{ ...backgroundStyle, ...style }} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;