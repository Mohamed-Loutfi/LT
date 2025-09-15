import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">LegalTech</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:text-blue-600">Accueil</a>
          <a href="/podcasts" className="hover:text-blue-600">Podcasts</a>
          <a href="/cours" className="hover:text-blue-600">Cours</a>
          <a href="/quiz" className="hover:text-blue-600">Quiz</a>
          <a href="/faq" className="hover:text-blue-600">FAQ</a>
          <a href="/docgen" className="hover:text-blue-600">Docu-Gen</a>
        </nav>
        <button
          onClick={logout}
          className=" text-white rounded transition"
        >
          Logout
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24 text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-4xl font-bold mb-4">Bienvenue sur LegalTech</h2>
        <p className="max-w-xl mb-6">
          Une plateforme pour apprendre le droit, écouter des podcasts, suivre
          des cours interactifs, et générer vos documents légaux.
        </p>
        <button
          onClick={() => navigate("/cours")}
          className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-100"
        >
          Commencer
        </button>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 py-16">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🎧 Podcasts</h3>
          <p>Écoutez nos Legal-Casts pour rester informé.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📚 Ressources Légales</h3>
          <p>Accédez à notre médiathèque et au dictionnaire juridique.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📝 Certifications</h3>
          <p>Approfondissez vos connaissances juridiques avec nos certifications.</p>
        </div>
      </section>
    </div>
  );
}
