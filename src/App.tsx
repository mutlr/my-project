import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Burgermenu from './components/Burgermenu/Burgermenu'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Message from './components/Message/Message';
function App() {
  return (
    <div className="App">
      <Message message={'text'} type={null} />
      <Navbar />
      <Routes>
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
