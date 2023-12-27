import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Message from './components/Message/Message';
import View from './components/PostLayout/View';
function App () {
    return (
        <div className="App">
            <Message message={null} type={null} />
            <Navbar />
            <Routes>
                <Route path='/' element={<View />}/>
                <Route path='login' element={<Login />}/>
                <Route path='register' element={<Register />}/>
            </Routes>
        </div>
    );
}

export default App;
