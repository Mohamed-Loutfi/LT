import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from "./pages/Home";
import ClientSpace from "./pages/ClientSpace";
import MediaLibrary from "./pages/MediaLibrary";
import Podcasts from "./pages/Podcasts";
import LegalResource from './pages/LegalResource';
import Faq from './pages/Faq';
import Docgen from './pages/DocGen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/client" element={<ClientSpace />} />
        <Route path="/mediatheque" element={<MediaLibrary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/cours" element={<LegalResource />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/docgen" element={<Docgen/>} />
      </Routes>
    </Router>
  );
}

export default App;
