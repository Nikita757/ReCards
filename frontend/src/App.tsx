import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import { Dashboard } from './Dashboard/Dashboard';
import { Login } from './Login/Login'
import { Registration } from './Registration/Registration';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Registration />} />
        <Route path='deck/:id' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
