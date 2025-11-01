// src/components/Navbar.jsx
import { useState } from "react";
import { User } from "lucide-react"; // icône utilisateur
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/LEGALTECH-removebg-preview.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    `text-gray-700 hover:text-blue-600 visited:text-gray-700 transition ${
      isActive ? "border-b-2 border-blue-600 pb-1" : ""
    }`;

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow relative z-50">
      {/* Logo */}
      <img src={logo} alt="Logo" className="h-10 pl-20 scale-200" />

      {/* Navigation */}
      <nav className="space-x-6">
        <NavLink to="/" className={linkClasses}>Accueil</NavLink>
        <NavLink to="/about" className={linkClasses}>À propos</NavLink>
        <NavLink to="/legal" className={linkClasses}>Mentions légales</NavLink>

        {token && (
          <>
            <NavLink to="/podcasts" className={linkClasses}>Podcasts</NavLink>
            <NavLink to="/cours" className={linkClasses}>Médiathèque</NavLink>
            <NavLink to="/faq" className={linkClasses}>FAQ-AI</NavLink>
            <NavLink to="/docgen" className={linkClasses}>Docu-Gen</NavLink>
            <NavLink to="/courses" className={linkClasses}>Certifications</NavLink>
          </>
        )}
      </nav>

      {/* Icône utilisateur avec dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <User className="w-6 h-6 text-gray-700" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
            {token ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Déconnexion
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Connexion
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="block w-full text-left px-6 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Créer un compte
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
