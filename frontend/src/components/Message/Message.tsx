import React from 'react';
import './Message.css';

interface MessageProps {
    message: string | null,
    type: string | null
}
const Message = (props: MessageProps) => {
    if (!props.message) {
        return null;
    }
    const backgroundColor = props.type ? 'var(--error-color)' : 'green';
    return (
        <div className="message">
            <p className='message-text' style={{ backgroundColor }}>{props.message}</p>
        </div>
    );
};

export default Message;