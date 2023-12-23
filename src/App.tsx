import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Burgermenu from './components/Burgermenu/Burgermenu'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
