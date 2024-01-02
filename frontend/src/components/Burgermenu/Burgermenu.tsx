import './Burgermenu.css';
import React, { useState, useImperativeHandle, forwardRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserValues } from '../../types';
interface Props {
    user: UserValues | null,
    logout: () => void,
}

const Burgermenu = forwardRef((props: Props, ref) => {
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
    const logoutClick = () => {
        toggleVisibility();
        props.logout();
    };

    Burgermenu.displayName = 'Burgermenu';
    return (
        <div className='burger-main'>
            <div onClick={toggleVisibility} style={{ paddingLeft: '12px' }}>
                <div className='burger-line'></div>
                <div className='burger-line'></div>
                <div className='burger-line'></div>
            </div>
            <div className='burger-content' style={isOpen}>
                <Link onClick={toggleVisibility} to={'/'} className='burger-link'>Home</Link>
                {props.user &&<Link onClick={toggleVisibility} to={'login'} className='burger-link'>Profile</Link>}
                {!props.user && <Link onClick={toggleVisibility} to={'login'} className='burger-link'>Login</Link>}
                {props.user && <Link onClick={logoutClick} to={'login'} className='burger-link'>Logout</Link>}
            </div>
        </div>
    );
});

export default Burgermenu;