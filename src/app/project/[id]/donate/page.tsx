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
  const project = {
    id: 1,
    title: "AI-powered Image Recognition",
    description:
      "Develop a machine learning model for accurate image recognition and classification. This project aims to create a robust system that can identify objects, scenes, and patterns in images with high accuracy. We're looking for collaborators with experience in computer vision, deep learning, and Python programming.",
    longDescription:
      "Our project focuses on pushing the boundaries of image recognition technology. We're implementing state-of-the-art convolutional neural networks and exploring novel architectures to improve accuracy and efficiency. The system will be designed to handle a wide range of image types and will be optimized for both speed and accuracy. Key features we're working on include:\n\n- Multi-object detection and classification\n- Scene understanding and context analysis\n- Real-time processing for video streams\n- Integration with mobile and web platforms\n- Customizable training for specific use cases",
    tags: ["Python", "TensorFlow", "Computer Vision", "Deep Learning", "CNN"],
    roadmap: [
      {
        milestone: "Research and Planning",
        description:
          "Gather requirements, research state-of-the-art techniques, and plan project architecture",
        status: "Completed",
      },
      {
        milestone: "Data Collection and Preprocessing",
        description: "Collect and preprocess diverse image datasets for training",
        status: "In Progress",
      },
      {
        milestone: "Model Development",
        description: "Develop and train initial CNN models",
        status: "Not Started",
      },
      {
        milestone: "Testing and Optimization",
        description: "Conduct thorough testing and optimize model performance",
        status: "Not Started",
      },
      {
        milestone: "Integration and Deployment",
        description:
          "Integrate the model into a user-friendly application and deploy",
        status: "Not Started",
      },
    ],
    goals: [
      "Achieve 95% accuracy in object recognition across diverse image types",
      "Develop a model capable of real-time processing for video streams",
      "Create a user-friendly API for easy integration into various applications",
      "Optimize the model for mobile devices without significant performance loss",
      "Publish research findings and contribute to the open-source community",
    ],
    license: {
      name: "MIT License",
      description:
        "a simple and permissive open-source license that allows developers to use, modify, distribute, and sublicense software with minimal restrictions. Here are the key terms of the MIT License",
      permission: [
        "Commercial Use",
        "Distribution",
        "Modification",
        "Private Use",
      ],
      condition: ["License and copyright notice"],
      limitation: ["Liability", "Warranty"],
    },
  };

  if (projectId !== project.id) {
    notFound();
  }

  // State for money amount input
  const [money, setMoney] = useState("");

  // State for credit card form inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  
  const luhnCheck = (cardNumber: string) => {
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  // Validation
  const handleDonate = async () => {
    if (!/^\d*\.?\d{1,2}$/.test(money)) {
      alert("Enter a valid amount of money")
      return;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Enter a valid 16-digit card number.");
      return;
    }

    // Luhn algorithm check (basic card number validity)
    if (!luhnCheck(cardNumber)) {
      alert("Invalid card number.");
      return;
    }

    const trimmedCardHolder = cardHolder.trim(); // Trim whitespace
    if (!trimmedCardHolder) {
        alert("Enter the cardholder's name.");
        return;
    }

    if (!/^[a-zA-Z\s.'-]+$/.test(trimmedCardHolder)) {
      alert("Invalid cardholder name. Use only letters, spaces, periods, apostrophes, and hyphens.");
      return;
  }

    if (trimmedCardHolder.length > 100) { 
        alert("Cardholder name is too long.");
        return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      alert("Enter a valid expiry date (MM/YY).");
      return;
    }

    const [month, year] = expiryDate.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100; // Get last 2 digits of current year
    const currentMonth = new Date().getMonth() + 1;

    if (year && month){
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        alert("Card has expired.");
        return;
      }
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
          {loading ? "Processing..." : "Confirm"}
        </button>

        </div>
        <style jsx>{`
        .placeholder-right::placeholder {
          text-align: right;
        }
      `}</style>
    </div>
  );
}
