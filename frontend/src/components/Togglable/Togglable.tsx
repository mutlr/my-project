import React, { ReactElement, ReactNode } from 'react';
import './Togglable.css';
import { useState, useImperativeHandle, forwardRef } from 'react';
interface Props {
    children: ReactNode | ReactElement,
    buttonText: string
}
const Togglable = forwardRef((props: Props, ref) => {
    const [visible, setVisible] = useState<boolean>(false);

    const isOpen = { display: visible ? '' : 'none' };
    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return (
            toggleVisibility
        );
    });
    Togglable.displayName = 'Togglable';
    return (
        <>
            <div style={isOpen}>{props.children}</div>
            <p onClick={toggleVisibility} className='togglableBtn'>{isOpen.display === '' ? 'Back' : props.buttonText}</p>
        </>
    );
});

export default Togglable;