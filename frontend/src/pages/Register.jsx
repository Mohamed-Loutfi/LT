import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LEGALTECH-removebg-preview.png";
import intellcap from "../assets/intellcap.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appel à l’API
      const res = await register({ name, email, password });

      // ✅ Récupérer le token et l’utilisateur
      const { token, user } = res.data;

      // ✅ Sauvegarder le token dans localStorage
      localStorage.setItem("token", token);

      console.log("✅ Register success:", user);

      alert(`Bienvenue ${user.name} ! Votre compte a été créé.`);
      
      // ✅ Redirection automatique vers le dashboard
      navigate("/dashboard");

    } catch (e) {
      console.error("❌ Register échoué:", e?.response?.status, e?.response?.data);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
     style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1740&q=80')",
      }}
>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <img src={logo} alt="logo"  className="h-32 mx-auto"/>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 focus:placeholder-transparent text-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 focus:placeholder-transparent text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 focus:placeholder-transparent text-gray-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            S'inscrire
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
          Déjà un compte ?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Connectez-vous
          </a>
        </p>
          <img src={intellcap} alt="intellcap"  className="h-6 mx-auto mt-4" />
        </form>
      </div>
    </div>
  );
}
