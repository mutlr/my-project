import './Burgermenu.css';
import React, { useImperativeHandle, forwardRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import useVisibility from '../../hooks/useVisibility';

const Burgermenu = forwardRef((_, ref) => {
    const user = useContext(UserContext)
;    const { isOpen, toggleVisibility } = useVisibility();

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
                {user?.user &&<Link onClick={toggleVisibility} to={'/myprofile'} className='burger-link'>Profile</Link>}
                {!user?.user && <Link onClick={toggleVisibility} to={'/login'} className='burger-link'>Login</Link>}
                {!user?.user && <Link onClick={toggleVisibility} to={'/register'} className='burger-link'>Register</Link>}
                {user?.user && <Link onClick={logoutClick} to={'/'} className='burger-link'>Logout</Link>}
            </div>
        </div>
    );
});

export default Burgermenu;