import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 ">
      

      {/* Hero Section */}
      <section
  className="relative flex flex-col items-center justify-center py-24 text-center text-white"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1740&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black/50"></div> {/* overlay */}
  <div className="relative z-10">
    <h1 className="text-4xl font-bold">Bienvenue sur LegalTech</h1>
    <p className="mt-4 text-lg">Vos services juridiques simplifiés</p>
  </div>
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
