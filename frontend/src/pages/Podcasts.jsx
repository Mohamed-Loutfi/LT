import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Podcasts() {
  const navigate = useNavigate();
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Récupération des podcasts
    api
      .get("/podcasts")
      .then((res) => setPodcasts(res.data))
      .catch((err) => console.error("❌ Erreur chargement podcasts:", err));
  }, [navigate]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      

      {/* Content */}
      <main className="px-12 py-16">
        <h2 className="text-3xl font-bold mb-6">🎧 Nos Legal-Casts</h2>

        {podcasts.length === 0 ? (
          <p className="text-gray-500">Aucun podcast disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {podcasts.map((p) => (
              <div
                key={p.id}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-gray-600 mb-4">{p.description}</p>
                <audio controls className="w-full">
                  <source src={p.audioUrl} type="audio/mpeg" />
                  Votre navigateur ne supporte pas l’audio.
                </audio>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
