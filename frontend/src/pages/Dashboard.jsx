import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/documents/request")
      .then((res) => {
        console.log("✅ Réponse demandes:", res.data);
        setRequests(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("❌ Erreur Dashboard:", err?.response?.status, err?.response?.data);
      });
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">📑 Demandes de Rédaction de Documents</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">Aucune demande pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req.id} className="p-4 border rounded bg-gray-50 shadow">
              <h3 className="font-bold text-lg">{req.type}</h3>
              <p className="text-gray-700">{req.description}</p>
              <small className="text-gray-500">
                📅 Créé le {new Date(req.createdAt).toLocaleString()}
              </small>
              {req.user && (
                <p className="text-sm text-gray-600">
                  👤 Par : {req.user.name} ({req.user.email})
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
