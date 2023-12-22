import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Burgermenu from './components/Burgermenu/Burgermenu'
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='login'/>
      </Routes>
    </div>
  );
}

export default App;
