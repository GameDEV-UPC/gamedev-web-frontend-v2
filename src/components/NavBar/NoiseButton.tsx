import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageTransitionContext } from "../../hooks/transition"; // Ajusta ruta
import "./NoiseButton.css";

interface Option {
  value: string;
  label: string;
  path: string;
}

interface NoiseButtonProps {
  options: Option[];
}

function NoiseButton({ options }: NoiseButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedValue, setSelectedValue] = useState<string>(() => {
    const currentOption = options.find(
        (option) => option.path === location.pathname
    );
    return currentOption ? currentOption.value : options[0].value;
  });

  // Obtén la función para iniciar transición de página
  const pageTransition = useContext(PageTransitionContext);

  const handleOptionChange = (value: string, path: string) => {
    setSelectedValue(value);

    if (pageTransition) {
      // Inicia animación y navegación al terminar
      pageTransition.startTransition(path);
      setTimeout(() => {
        navigate(path);
      }, 600); // Duración de la animación
    } else {
      // fallback: navega directo
      navigate(path); // Asegúrate de tener acceso a navigate
    }
  };

  return (
      <div className="radio-button-container">
        {options.map((option, index) => (
            <div className="radio-btn-group" key={index}>
              <input
                  type="radio"
                  id={`input-${index}`}
                  name="stagger-radio-group"
                  value={option.value}
                  checked={selectedValue === option.value}
                  onChange={() => handleOptionChange(option.value, option.path)}
              />
              <label htmlFor={`input-${index}`}>
                <span>{option.label}</span>
              </label>
            </div>
        ))}
      </div>
  );
}

export default NoiseButton;
