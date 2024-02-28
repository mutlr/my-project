import './Burgermenu.css';
import React, { useImperativeHandle, forwardRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import useVisibility from '../../hooks/useVisibility';
import { NavbarLinks } from './Navbar';

const Burgermenu = forwardRef((_, ref) => {
    const user = useContext(UserContext);
    const { isOpen, toggleVisibility } = useVisibility();

    useImperativeHandle(ref, () => {
        return (
            toggleVisibility
        );
    });

    const logoutClick = () => {
        toggleVisibility();
        user?.logout();
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
                <NavbarLinks
                    user={!user?.user ? false : true}
                    toggle={toggleVisibility}
                    logout={logoutClick}
                />
            </div>
        </div>
    );
});

export default Burgermenu;