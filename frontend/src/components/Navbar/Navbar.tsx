import Burgermenu from './Burgermenu';
import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import { User } from '../../types';

interface Props {
    user: boolean,
    toggle?: () => void,
    logout: () => void,
}
export const NavbarLinks = ({ user, toggle, logout }: Props) => {
    return (
     <ul className='navbar-links'>
        <li className='navbar-link'><Link onClick={toggle} to={'/'}>Home</Link></li>
        {user && <li className='navbar-link'><Link onClick={toggle} to={'/myprofile'}>Profile</Link></li>}
        {!user && <li className='navbar-link'><Link onClick={toggle} to={'/login'}>Login</Link></li>}
        {!user && <li className='navbar-link'><Link onClick={toggle} to={'/register'}>Register</Link></li>}
        {user && <li className='navbar-link' onClick={logout}>Logout</li>}
    </ul>
    );
};
const Navbar = () => {
    const user = useContext(UserContext);

    return (
        <div className="navbar-main">
            <Burgermenu />
            <h1 id='logo'>LOGO</h1>
            <div className='navbar-desktop'>
                <NavbarLinks
                    user={!user?.user ? false : true}
                    logout={() => user?.logout()}/>
            </div>
        </div>
    );
};

export default Navbar;
