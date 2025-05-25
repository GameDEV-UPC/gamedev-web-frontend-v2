import React from 'react';
import './Home.css';
import Logo from '../../assets/logos/logo.png'; // O usa la imagen subida
import { FaInstagram, FaGithub, FaXTwitter } from 'react-icons/fa6';
import BitButton from "../../components/BitButton/BitButton.tsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            {/* Header */}
            <header>
                <h1 className="brand-title">GameDev</h1>
            </header>

            {/* Main Section */}
            <main className="main-container">
                <div className="logo-wrapper">
                    <img src={Logo} alt="GameDev Logo" className="animated-logo" />
                </div>
                <div className="button-group">
                    <BitButton onClick={() => navigate("/login")}>Login</BitButton>
                    <BitButton onClick={() => navigate("/signup")}>Sign Up</BitButton>
                </div>
            </main>

            {/* Footer */}
            <footer>
                <div className="footer-socials">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                </div>
                <div>© {new Date().getFullYear()} GameDev. Todos los derechos reservados.</div>
            </footer>
        </div>
    );
}
