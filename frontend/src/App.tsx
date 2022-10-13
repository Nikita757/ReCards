import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import { Dashboard } from "./Dashboard/Dashboard";
import Deckboard from "./Deckboard/Deckboard";
import { Login } from "./Login/Login";
import { Registration } from "./Registration/Registration";
import WelcomePage from "./WelcomePage/WelcomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="deck/:id" element={<Deckboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
