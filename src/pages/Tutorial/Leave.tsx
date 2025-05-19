import React, { useState } from "react";
import EffectText from "../../components/EffectText/EffectText";
import "./Tutorial.css";
import BitButton from "../../components/BitButton/BitButton";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import transition from "../../hooks/transition";
const Leave: React.FC = () => {
  const { user } = useAuth(); // Obtén el usuario logueado desde el contexto
  const navigate = useNavigate();

  const handleLeave = async () => {
    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    const username = user.username; // Usa el nombre de usuario del usuario logueado
    console.log("Username:", username);
    try {
      const response = await fetch("https://api.gamedev.study/marbles/leave", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        navigate("/main"); // Redirige a la página de Home
      } else {
        console.error("Error en la petición:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  return (
    <div className="container">
      <EffectText fontSize="1.3rem">Thanks For Playing</EffectText>
      <div className="input-container"></div>

      <BitButton onClick={handleLeave}>Leave</BitButton>
    </div>
  );
};

export default transition(Leave);
