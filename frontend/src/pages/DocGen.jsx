import { useState, useEffect } from "react";
import api from "../api";

export default function DocGen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [docType, setDocType] = useState("");
  const [requests, setRequests] = useState([]);

  // 🔹 Charger les documents déjà demandés
  const fetchRequests = async () => {
    try {
      const res = await api.get("/documents");
      setRequests(res.data);
    } catch (err) {
      console.error("❌ Erreur lors du chargement des documents :", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔹 Soumettre une nouvelle demande
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/documents", { type: docType, content: description, title });
      alert("✅ Votre demande a été envoyée avec succès !");
      setTitle("");
      setDescription("");
      setDocType("");
      fetchRequests(); // Recharge la liste après envoi
    } catch (err) {
      console.error("❌ Erreur lors de l'envoi :", err);
      alert("Erreur lors de l'envoi de la demande");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Générateur de Documents Juridiques</h1>

      {/* 🔹 Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Titre de la demande"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 focus:placeholder-transparent"
          required
        />

        <textarea
          placeholder="Description / détails du document"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 focus:placeholder-transparent"
          rows="4"
          required
        />

        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 focus:placeholder-transparent"
          required
        >
          <option value="">-- Sélectionnez un type de document --</option>
          <option value="Contrat">Contrat</option>
          <option value="Statuts">Statuts</option>
          <option value="Accord">Accord</option>
          <option value="Autre">Autre</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Envoyer la demande
        </button>
      </form>

      {/* 🔹 Liste des documents existants */}
      <h2 className="text-xl font-semibold mt-8 mb-4">📑 Mes documents</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">Aucun document généré pour l’instant.</p>
      ) : (
        <ul className="space-y-3">
          {requests.map((doc) => (
            <li key={doc.id} className="p-4 border rounded bg-gray-50 shadow">
              <h3 className="font-bold">{doc.type}</h3>
              <p className="text-gray-700">{doc.content}</p>
              <small className="text-gray-500">
                Créé le {new Date(doc.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
