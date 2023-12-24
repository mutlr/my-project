import Burgermenu from '../Burgermenu/Burgermenu';
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
        <div className="navbar-main">
            <Burgermenu />
            <h1 id='logo'>LOGO</h1>
            <ul className='navbar-link-container'>
                <li className='navbar-link'><Link to={'/'}>Home</Link></li>
                <li className='navbar-link'><Link to={'/profile'}>Profile</Link></li>
                <li className='navbar-link'><Link to={'/login'}>Login</Link></li>
                <li className='navbar-link'><Link to={'/register'}>Register</Link></li>
                <li className='navbar-link'><Link to={'/login'}>Logout</Link></li>
            </ul>
        </div>
  );
};

export default Navbar;
