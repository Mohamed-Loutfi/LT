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
import Docgen from './pages/Docgen';
import About from './pages/About';
import Legal from './pages/Legal';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Courses from './pages/Courses';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/"  element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/client" element={<ClientSpace />} />
        <Route path="/mediatheque" element={<MediaLibrary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/podcasts" element={<ProtectedRoute> <Podcasts /> </ProtectedRoute>} />
        <Route path="/cours" element={<ProtectedRoute> <LegalResource /> </ProtectedRoute>} />
        <Route path="/faq" element={<ProtectedRoute> <Faq /> </ProtectedRoute>} />
        <Route path="/docgen" element={<ProtectedRoute> <Docgen /> </ProtectedRoute>} />
        <Route path="/about" element={<About/>} />
        <Route path="/legal" element={<Legal/>} />
        <Route path="/courses" element={<ProtectedRoute> <Courses /> </ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
