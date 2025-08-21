import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClientSpace from "./pages/ClientSpace";
import MediaLibrary from "./pages/MediaLibrary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client" element={<ClientSpace />} />
        <Route path="/mediatheque" element={<MediaLibrary />} />
      </Routes>
    </Router>
  );
}

export default App;
