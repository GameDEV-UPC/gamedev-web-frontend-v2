import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { PageTransitionContext } from "../../hooks/transition"; // Ajusta ruta
import "./NoiseButton.css";
import { nav } from "framer-motion/client";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const previousRadioRef = useRef<HTMLInputElement | null>(null);

  const [selectedValue, setSelectedValue] = useState<string>(() => {
    const currentOption = options.find(
      (option) => option.path === location.pathname
    );
    return currentOption ? currentOption.value : options[0].value;
  });

  // Obtén la función para iniciar transición de página
  const pageTransition = useContext(PageTransitionContext);

  useEffect(() => {
    if (!containerRef.current) return;

    const getNodes = (radio: HTMLInputElement) => {
      const container = radio.closest(".radio-btn-group");
      return [
        gsap.utils.shuffle(
          Array.from(container!.querySelectorAll(".blue rect"))
        ),
        gsap.utils.shuffle(
          Array.from(container!.querySelectorAll(".pink rect"))
        ),
      ];
    };

    const animate = (elements: Element[][], isChecked: boolean) => {
      const direction = isChecked ? "100" : "-100";
      const options = {
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
        stagger: 0.01,
        overwrite: true,
      };
      gsap.to(elements[0], { ...options, xPercent: direction, delay: 0.13 });
      gsap.to(elements[1], { ...options, xPercent: direction });
    };

    const handleRadioChange = (radio: HTMLInputElement) => {
      const nodes = getNodes(radio);
      if (previousRadioRef.current && previousRadioRef.current !== radio) {
        animate(getNodes(previousRadioRef.current), false);
      }
      animate(nodes, true);
      previousRadioRef.current = radio;
    };

    const inputs = Array.from(
      containerRef.current.querySelectorAll("input[type='radio']")
    ) as HTMLInputElement[];
    inputs.forEach((input) =>
      input.addEventListener("change", () => handleRadioChange(input))
    );

    const defaultRadio = inputs.find((input) => input.value === selectedValue);
    if (defaultRadio) {
      handleRadioChange(defaultRadio);
    }

    return () => {
      inputs.forEach((input) =>
        input.removeEventListener("change", () => handleRadioChange(input))
      );
    };
  }, [selectedValue]);

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
      // O usa un navigate si tienes acceso
    }
  };

  return (
    <div className="radio-button-container" ref={containerRef}>
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
            <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <g className="pink">
                {Array.from({ length: 10 }).map((_, i) => (
                  <rect
                    key={`pink-${i}`}
                    x="-100%"
                    y={i * 5}
                    width="100%"
                    height="5"
                  />
                ))}
              </g>
              <g className="blue">
                {Array.from({ length: 10 }).map((_, i) => (
                  <rect
                    key={`blue-${i}`}
                    x="-100%"
                    y={i * 5}
                    width="100%"
                    height="5"
                  />
                ))}
              </g>
            </svg>
          </label>
        </div>
      ))}
    </div>
  );
}

export default NoiseButton;
