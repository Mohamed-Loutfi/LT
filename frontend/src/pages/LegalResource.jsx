import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function LegalResource() {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/legalresource")
      .then((res) => setResources(res.data))
      .catch((err) => console.error("❌ Erreur chargement ressources:", err));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">LegalTech - Ressources</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:text-blue-600">Accueil</a>
          <a href="/podcasts" className="hover:text-blue-600">Podcasts</a>
          <a href="/cours" className="hover:text-blue-600">Cours</a>
          <a href="/quiz" className="hover:text-blue-600">Quiz</a>
          <a href="/faq" className="hover:text-blue-600">FAQ</a>
          <a href="/docgen" className="hover:text-blue-600">Docu-Gen</a>
        </nav>
      </header>
    

      <main className="px-12 py-16">
        <h2 className="text-3xl font-bold mb-6">📚 Nos Ressources Légales</h2>

        {resources.length === 0 ? (
          <p className="text-gray-500">Aucune ressource disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((r) => (
              <div
                key={r.id}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{r.title}</h3>
                <p className="text-gray-600 mb-4">{r.content}</p>
                <span className="text-sm text-blue-500 font-medium">
                  {r.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
