import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import BitButton from "../../components/BitButton/BitButton.tsx";
import EffectText from "../../components/EffectText/EffectText.tsx";
import xIcon from "@icons/icons8-x.svg";
import instaIcon from "@icons/icons8-insta.svg";
import gitIcon from "@icons/icons8-github.svg";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => navigate(path);

  return (
    <div className="container">
      {/* Presentación principal */}
      <div className="presentation-container">
        <div className="presentation-title">
          <LogoAnimated />
        </div>

        <div className="button-container">
          <BitButton onClick={() => handleNavigate("/login")}>LOGIN</BitButton>
          <BitButton onClick={() => handleNavigate("/signup")}>
            SIGN UP
          </BitButton>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
        </div>

        <div className="social-icons">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={xIcon} alt="Twitter" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instaIcon} alt="LinkedIn" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={gitIcon} alt="GitHub" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function LogoAnimated() {
  return <h2 className="logo-title">GAMEDEV</h2>;
}

export default Home;
