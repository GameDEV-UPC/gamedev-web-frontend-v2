import React from "react";
import "./Home.css";
import Logo from "../../assets/logos/logo.png";
import { FaInstagram, FaGithub, FaXTwitter } from "react-icons/fa6";
import BitButton from "../../components/BitButton/BitButton.tsx";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, Github } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <h1 className="glitch-title">GAMEDEV</h1>
        <p className="subtext">¡Bienvenido a GameDev!</p>
      </header>

      {/* Main Section */}
      <main className="main-container">
        <div className="logo-wrapper">
          <img src={Logo} alt="GameDev Logo" className="animated-logo" />
        </div>

        <div className="button-group">
          <BitButton className="primary-btn" onClick={() => navigate("/login")}>
            Login
          </BitButton>
          <BitButton
            className="primary-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </BitButton>
          <BitButton
            icon={<CircleUserRound className="social-icon" />}
            onClick={() =>
              (window.location.href =
                "https://api.gamedev.study/auth/google/login")
            }
          >
            Google
          </BitButton>
          <BitButton
            icon={<Github className="social-icon" />}
            onClick={() =>
              (window.location.href =
                "https://api.gamedev.study/auth/github/login")
            }
          >
            GitHub
          </BitButton>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-socials">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </a>
        </div>
        <div>
          © {new Date().getFullYear()} GameDev. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
