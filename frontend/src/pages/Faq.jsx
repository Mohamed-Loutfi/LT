import { useState } from "react";
import api from "../api";
import { logout } from "../services/authService";

export default function FAQ() {
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Ajoute la question de l'utilisateur dans l'historique
    const newHistory = [...history, { role: "user", text: question }];
    setHistory(newHistory);

    try {
      const res = await api.post("/faq/ask", { question });
      const aiMessage = res.data.message;

      // Ajoute la réponse IA
      setHistory([...newHistory, { role: "ai", text: aiMessage }]);
    } catch (err) {
      console.error(err);
      setHistory([...newHistory, { role: "error", text: "❌ Erreur lors de la récupération de la réponse." }]);
    }

    setQuestion(""); // reset input
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">LegalTech</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:text-blue-600">Accueil</a>
          <a href="/podcasts" className="hover:text-blue-600">Podcasts</a>
          <a href="/cours" className="hover:text-blue-600">Cours</a>
          <a href="/faq" className="hover:text-blue-600">FAQ-AI</a>
          <a href="/docgen" className="hover:text-blue-600">Docu-Gen</a>
        </nav>
        <button
          onClick={logout}
          className="ml-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Zone de chat */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {history.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : msg.role === "ai"
                  ? "bg-gray-200 text-gray-800 rounded-bl-none"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Zone de saisie */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex">
        <input
          type="text"
          className="flex-2 border rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          placeholder="Posez votre question juridique..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded-r hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </form>
      <a className="text-gray-900">Cette IA peut faire des erreurs</a>
    </div>
  );
}
