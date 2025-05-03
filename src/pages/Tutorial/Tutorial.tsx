import React, { useState } from "react";
import BitInput from "../../components/BitInput/BitInput";
import BitButton from "../../components/BitButton/BitButton";
import "./Tutorial.css";
import EffectText from "../../components/EffectText/EffectText";

const Tutorial: React.FC = () => {
  const [nick, setNick] = useState("");
  const [color, setColor] = useState("#ff0000");

  const handleJoin = async () => {
    console.log("Nick:", nick);
    console.log("Color:", color);
    try {
      const response = await fetch("http://127.0.0.1:8000/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nick: nick,
          color: color,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
      } else {
        console.error("Error en la petición:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  return (
    <div className="container">
      <EffectText fontSize="1.3rem">Try It!</EffectText>
      <div className="input-container">
        <BitInput
          placeholder="Enter your username"
          value={nick}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNick(e.target.value)
          }
        />

        <div className="color-picker">
          <label className="color-text">Choose your color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>

      <BitButton onClick={handleJoin}>Join</BitButton>
    </div>
  );
};

export default Tutorial;
