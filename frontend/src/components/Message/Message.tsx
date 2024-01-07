import React, { useContext } from 'react';
import './Message.css';
import { MessageContext } from '../../context/messageContext';

const Message = () => {
    const alert = useContext(MessageContext);
    if (alert?.message === '') {
        return null;
    }
    const backgroundColor = alert?.type === 'error' ? 'var(--error-color)' : 'green';
    return (
        <div className="message">
            <p className='message-text' style={{ backgroundColor }}>{alert?.message}</p>
        </div>
    );
};

export default Message;