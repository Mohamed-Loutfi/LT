import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LEGALTECH-removebg-preview.png";
import intellcap from "../assets/intellcap.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login({ email, password });
      console.log("✅ Token sauvegardé:", token);
      navigate("/home");
    } catch (err) {
      console.error("❌ Erreur Login:", err?.response?.status, err?.response?.data);
      alert("Échec de connexion. Vérifie email/mot de passe.");
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
    <form onSubmit={handleSubmit}  className="space-y-4">
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
      <button type="submit" className="w-full bg-blue-600  p-3 rounded hover:bg-blue-700 transition text-black">Login</button>
      <p className="text-center text-sm text-gray-600 mt-4">
          Pas encore inscrit ?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Créer un compte
          </a>
        </p>
          <img src={intellcap} alt="intellcap"  className="h-6 mx-auto mt-4" />
    </form>
    </div>
    </div>
  );
}
