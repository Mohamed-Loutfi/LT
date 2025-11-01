// src/pages/DocGen.jsx
import { useState, useEffect } from "react";
import api from "../api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51S7ijhQbkkQjfsbh0R8g6ALt5fKS6Dghw8PODBZDVABccAHM6xPzANNyxTB1dpugyXm1BNvXQZmkvUyORNHTLCsd00315IXLzZ"); // clé publique Stripe

function CheckoutForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Demander un clientSecret au backend
      const { data } = await api.post("/payment/create-payment-intent", { amount });

      // 2. Confirmer le paiement
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage("❌ Erreur : " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("✅ Paiement réussi !");
        onSuccess(); // déclenche la création de la demande
      }
    } catch (err) {
      console.error("❌ Erreur paiement :", err);
      setMessage("Erreur lors du paiement");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
      <CardElement />
      <button type="submit" disabled={!stripe} className="bg-blue-600 text-black px-4 py-2 rounded mt-4">
        Payer {amount / 100} €
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}

export default function DocGen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [docType, setDocType] = useState("");
  const [requests, setRequests] = useState([]);
  const [pendingRequest, setPendingRequest] = useState(null); // demande en attente de paiement

  // 🔹 Charger les demandes déjà faites par l’utilisateur
  const fetchRequests = async () => {
    try {
      const res = await api.get("/documents/request/my");
      setRequests(res.data);
    } catch (err) {
      console.error("❌ Erreur lors du chargement des demandes :", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔹 Préparer une nouvelle demande → paiement requis
  const handleSubmit = (e) => {
    e.preventDefault();
    setPendingRequest({ title, description, type: docType });
  };

  // 🔹 Après succès du paiement → enregistrer la demande
  const handlePaymentSuccess = async () => {
    try {
      await api.post("/documents/request", { ...pendingRequest });
      alert("✅ Demande envoyée avec succès !");
      setTitle("");
      setDescription("");
      setDocType("");
      setPendingRequest(null);
      fetchRequests(); // recharger la liste
    } catch (err) {
      console.error("❌ Erreur création demande :", err);
      alert("Erreur lors de la création de la demande");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Demande de Rédaction de Documents Juridiques</h1>

      {/* 🔹 Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Titre de la demande"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          required
        />

        <textarea
          placeholder="Description / détails du document"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          rows="4"
          required
        />

        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
          className="w-full bg-blue-600 text-black p-3 rounded hover:bg-blue-700 transition"
        >
          Valider & passer au paiement
        </button>
      </form>

      {/* 🔹 Paiement Stripe */}
      {pendingRequest && (
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={1000} onSuccess={handlePaymentSuccess} /> {/* montant en centimes */}
        </Elements>
      )}

      {/* 🔹 Liste des demandes existantes */}
      <h2 className="text-xl font-semibold mt-8 mb-4">📑 Mes demandes</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">Aucune demande pour l’instant.</p>
      ) : (
        <ul className="space-y-3">
          {requests.map((req) => (
            <li key={req.id} className="p-4 border rounded bg-gray-50 shadow">
              <h3 className="font-bold">{req.type}</h3>
              <p className="text-gray-700">{req.description}</p>
              <small className="text-gray-500">
                Créée le {new Date(req.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
