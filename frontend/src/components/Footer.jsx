// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} LegalTech. Tous droits réservés.
      </p>
      <p className="text-gray-500 text-xs">
        <a href="/legal" className="hover:text-blue-600">Mentions légales</a> |{" "}
        <a href="/about" className="hover:text-blue-600">À propos</a>
      </p>
    </footer>
  );
}
