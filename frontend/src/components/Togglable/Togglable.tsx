import React, { ReactElement, ReactNode } from 'react';
import './Togglable.css';
import { useImperativeHandle, forwardRef } from 'react';
interface Props {
    children: ReactNode | ReactElement,
    buttonText: string,
    isOpen: string,
    toggleVisibility: () => void
}
const Togglable = forwardRef((props: Props, ref) => {
    useImperativeHandle(ref, () => {
        return (
            props.toggleVisibility
        );
    });
    Togglable.displayName = 'Togglable';
    return (
        <>
            <div style={{ display: props.isOpen, }}>{props.children}</div>
            <p onClick={props.toggleVisibility} className='togglableBtn'>{props.isOpen === '' ? 'Back' : props.buttonText}</p>
        </>
    );
});

export default Togglable;