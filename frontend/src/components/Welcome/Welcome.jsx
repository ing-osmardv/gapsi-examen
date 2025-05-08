import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Welcome.css";
import gapsiLogo from "../../assets/logo.png";
import candidateImage from "../../assets/candidato.png";
import { getWelcomeData } from "../../services/welcome.service";

export default function Welcome() {
  const navigate = useNavigate();
  const [welcomeData, setWelcomeData] = useState({
    message: "",
    version: "0.0.0",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("HELLO");
      const data = await getWelcomeData();
      setWelcomeData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  const handleContinue = () => {
    navigate("/providers");
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <img src={gapsiLogo} alt="Gapsi Logo" className="logo" />
        <h1>e-Commerce Gapsi</h1>
      </header>

      <main className="welcome-content">
        <div className="welcome-card">
          <img
            src={candidateImage}
            alt="Candidato"
            className="candidate-image"
          />
          <h2>{welcomeData.message}</h2>
          <button className="continue-button" onClick={handleContinue}>
            Continuar
          </button>
          <p className="version">Versión: {welcomeData.version}</p>
        </div>
      </main>
    </div>
  );
}
