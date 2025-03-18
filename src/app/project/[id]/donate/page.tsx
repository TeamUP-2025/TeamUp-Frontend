"use client";

import { useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function DonatePage() {
  const router = useRouter()
  const params = useParams();
    
  const projectId = params.id ? Number.parseInt(params.id as string, 10) : null;

  // use id from url to get project (API to be implemented)
  // mock up project data
  const project = { title: "Awesome Project", description: "Support this amazing project!" };

  // State for money amount input
  const [money, setMoney] = useState("");

  // State for credit card form inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation
  const handleDonate = async () => {
    if (!/^\d*\.?\d{2}$/.test(money)) {
      alert("Enter a valid amount of money")
      return;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Enter a valid 16-digit card number.");
      return;
    }
    if (!cardHolder.trim()) {
      alert("Enter the cardholder's name.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      alert("Enter a valid expiry date (MM/YY).");
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      alert("Enter a valid CVV.");
      return;
    }

    toast.success("Donation successful!");
    router.push(`/project/${projectId}`);

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-md text-center">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <p className="text-gray-600">{project.description}</p>

        <div className="relative mt-4 w-full">
        {/* Static $ next to the input */}
        <input
          type="text"
          placeholder="1.00"
          className="mt-4 p-2 pr-7 border rounded w-full truncate"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          disabled={loading}
        />
        <span className="absolute right-2 top-2/3 transform -translate-y-1/2">$</span>

      </div>

        {/* Cardholder Name */}
        <input
          type="text"
          placeholder="Cardholder Name"
          className="mt-4 p-2 border rounded w-full"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          disabled={loading}
        />

        {/* Credit Card Number */}
        <input
          type="text"
          maxLength={16}
          placeholder="Card Number (16 digits)"
          className="mt-4 p-2 border rounded w-full"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          disabled={loading}
        />

        {/* Expiration Date */}
        <input
          type="text"
          maxLength={5}
          placeholder="Expiry (MM/YY)"
          className="mt-4 p-2 border rounded w-full"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          disabled={loading}
        />

        {/* CVV */}
        <input
          type="text"
          maxLength={4}
          placeholder="CVV (3 or 4 digits)"
          className="mt-4 p-2 border rounded w-full"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          disabled={loading}
        />

        {/* Confirm Button */}
        <button
          onClick={handleDonate}
          className={`mt-4 p-3 text-white rounded w-full ${loading ? "bg-gray-400" : "bg-blue-500"}`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Donation"}
        </button>
        </div>
        <style jsx>{`
        .placeholder-right::placeholder {
          text-align: right; /* Align placeholder text to the right for this input */
        }
      `}</style>
    </div>
  );
}
