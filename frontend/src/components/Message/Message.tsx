import React, { useContext, useEffect, useState } from 'react';
import './Message.css';
import { MessageContext } from '../../context/messageContext';

const Message = () => {
    const alert = useContext(MessageContext);
    const [scroll, setScroll] = useState<number>(0);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    if(!alert?.message) return null;

    const backgroundColor = alert.type === 'error' ? 'var(--error-color)' : 'green';
    function handleScroll() {
        const height = window.scrollY;
        if (height > 70 && height < 100) {
            setScroll(window.scrollY);
        }
    }
    return (
        <div className={`message ${scroll > 85 ? 'scroll' : ''}`} >
            <p className={`message-text`} style={{ backgroundColor }}>{alert.message}</p>
        </div>
    );
};

export default Message;