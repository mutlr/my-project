import React, { useContext, useEffect, useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import logo from '../../assets/Spotify_icon.svg.png';
import magnify from '../../assets/search.png';
import Xicon from '../../assets/cross.png';
import useVisibility from "../../hooks/useVisibility";
import UserContext from "../../context/userContext";
import { useDebounce } from "@uidotdev/usehooks";
import { searchUsers } from "../../services/userService";
interface Props {
    toggleVisibility: () => void,
}

const Burgerlines = (props: Props) => {
    return (
        <div style={{ paddingLeft: '12px' }} onClick={props.toggleVisibility}>
            <div className='burger-line'></div>
            <div className='burger-line'></div>
            <div className='burger-line'></div>
        </div>
    );
};

const Searchbar = () => {
    const [search, setSearch] = useState<string>("");
    const debouncedSearchTerm = useDebounce(search, 500);
    const [users, setUsers] = useState<{username: string, id: number}[]>([]);

    useEffect(() => {
        if (search.length === 0) {
            clearData();
            return;
        }
        searchUsers(debouncedSearchTerm)
        .then(result => setUsers(result.map(user => user)))
        .catch(error => console.log('Error from navbar search:', error));
    }, [debouncedSearchTerm]);

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };

    const clearData = () => {
        setSearch('');
        setUsers([]);
    };

    return (
        <div className="search-main">
            <div className="search-container">
                <input
                    id="search"
                    type="search"
                    placeholder="Search for users"
                    onChange={handleSearch}
                    value={search}/>
                {search.length > 0 ?
                    <img className="search-image" src={Xicon} onClick={clearData}/> :
                    <img className="search-image" src={magnify} />}
                {users.length > 0 && <div className="user-search">
                    {users.map(user =>
                    <a href={`/profile/${user.id}`} key={user.id}>
                        <p>{user.username}</p>
                    </a>)}
                </div>}
            </div>
        </div>
    );
};
interface NavbarLinksProps extends Props{
    isOpen: string
}
const NavbarLinks = (props: NavbarLinksProps) => {
    const user = useContext(UserContext);

    const logout = () => {
        props.toggleVisibility();
        user.logout();
    };
    return (
        <ul className='navbar-link-container' style={{ display: props.isOpen }}>
        <li className='nav-link' onClick={props.toggleVisibility}><Link to={'/'}>Home</Link></li>
        {user.user && <li className='nav-link' onClick={props.toggleVisibility}><Link to={'/myprofile'}>Profile</Link></li>}
        {!user.user &&
        <>
            <li className='nav-link' onClick={props.toggleVisibility}><Link to={'/login'}>Login</Link></li>
            <li className='nav-link' onClick={props.toggleVisibility}><Link to={'/register'}>Register</Link></li>
        </>}
        {user.user && <li className='nav-link' onClick={logout}><Link to={'/'}>Logout</Link></li>}
    </ul>
    );
};
const Navbar = () => {
    const { isOpen, toggleVisibility } = useVisibility();
    return (
        <div id="navbar">
            <img id='logo' src={logo}/>
            <Burgerlines toggleVisibility={toggleVisibility}/>
            <Searchbar />
            <NavbarLinks toggleVisibility={toggleVisibility} isOpen={isOpen}/>
        </div>
    );
};

export default Navbar;