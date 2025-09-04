import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users")
      .then((res) => {
        console.log("✅ /users:", res.data);
        setUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("❌ /users:", err?.response?.status, err?.response?.data);
        alert("Accès refusé: vérifie le token");
      });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {users.map(u => <li key={u.id}>{u.name} ({u.email})</li>)}
      </ul>
    </div>
  );
}
