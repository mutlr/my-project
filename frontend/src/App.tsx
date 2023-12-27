import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Message from './components/Message/Message';
import View from './components/PostLayout/View';
import { UserValues } from './types';
function App () {
    const [user, setUser] = useState<UserValues | null>(null);
    const handleUser = (values: UserValues) => {
        console.log('Values on app: ', values);
        localStorage.setItem('loggedUser', JSON.stringify(values));
        setUser(values);
        console.log('User: ', user);
    };
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        if (loggedUser) {
          const user = JSON.parse(loggedUser);
          setUser(user);
        }
      }, []);

    const logout = () => {
        localStorage.removeItem('loggedUser');
        setUser(null);
    };
    return (
        <div className="App">
            <Message message={null} type={null} />
            <Navbar user={user} logout={logout}/>
            <Routes>
                <Route path='/' element={<View />}/>
                <Route path='login' element={<Login handleUser={handleUser}/>}/>
                <Route path='register' element={<Register handleUser={handleUser}/>}/>
            </Routes>
        </div>
    );
}

export default App;
