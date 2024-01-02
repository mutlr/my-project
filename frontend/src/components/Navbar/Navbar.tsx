import Burgermenu from '../Burgermenu/Burgermenu';
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { UserValues } from '../../types';
interface Props {
    user: UserValues | null,
    logout: () => void,
}
const Navbar = (props: Props) => {
    return (
        <div className="navbar-main">
            <Burgermenu logout={props.logout} user={props.user} />
            <h1 id='logo'>LOGO</h1>
            <ul className='navbar-link-container'>
                <li className='navbar-link'><Link to={'/'}>Home</Link></li>
                <li className='navbar-link'><Link to={'/profile'}>Profile</Link></li>
                {!props.user && <li className='navbar-link'><Link to={'/login'}>Login</Link></li>}
                {!props.user && <li className='navbar-link'><Link to={'/register'}>Register</Link></li>}
                {props.user && <li className='navbar-link' onClick={props.logout}>Logout</li>}
            </ul>
        </div>
    );
};

export default Navbar;
