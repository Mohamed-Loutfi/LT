import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const t = await login({ email, password });
      console.log("✅ Token sauvegardé:", t);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login échoué");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
