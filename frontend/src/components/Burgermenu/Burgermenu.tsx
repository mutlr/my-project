import './Burgermenu.css';
import React, { useState, useImperativeHandle, forwardRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';

const Burgermenu = forwardRef((_, ref) => {
    const user = useContext(UserContext)
;    const [visible, setVisible] = useState<boolean>(false);

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
                <Link onClick={toggleVisibility} to={'/'} className='burger-link'>Home</Link>
                {user &&<Link onClick={toggleVisibility} to={'login'} className='burger-link'>Profile</Link>}
                {!user && <Link onClick={toggleVisibility} to={'login'} className='burger-link'>Login</Link>}
                {user && <Link onClick={logoutClick} to={'login'} className='burger-link'>Logout</Link>}
            </div>
        </div>
    );
});

export default Burgermenu;