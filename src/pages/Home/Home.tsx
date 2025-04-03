import React, { useState, useEffect } from "react";
import "./Home.css";
import BitButton from "@components/BitButton/BitButton.tsx";
import { useNavigate } from "react-router-dom";
import EffectText from "@components/EffectText/EffectText.tsx";
import xIcon from "@icons/icons8-x.svg";
import instaIcon from "@icons/icons8-insta.svg";
import gitIcon from "@icons/icons8-github.svg";
import logo from "@logos/LOGO.png";
function Home() {
    const navigate = useNavigate();

    const handleNavigate = (path) => navigate(path);

    return (
        <div className="container"> {/* Contenedor principal para todo */}
            <div className="presentation-container">
                <div className="presentation-title">
                    <EffectText fontSize="5rem" pixelMode={true} borderOffset={3.0}>
                        GAMEDEV
                    </EffectText>
                </div>

                <img src={logo} alt="logo" />

                <div className="button-container">
                    <BitButton onClick={() => handleNavigate("/login")} aria-label="Go to Login Page">
                        LOGIN
                    </BitButton>
                    <BitButton onClick={() => handleNavigate("/signup")} aria-label="Go to Sign Up Page">
                        SIGN UP
                    </BitButton>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-links">
                    <a href="/about">
                        <EffectText>About</EffectText>
                    </a>
                    <a href="/contact"><EffectText>Contact</EffectText></a>
                    <a href="/privacy"><EffectText>Privacy</EffectText></a>
                </div>
                <div className="social-icons">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={xIcon} alt="Twitter" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={instaIcon} alt="LinkedIn" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <img src={gitIcon} alt="GitHub" />
                    </a>
                </div>
            </footer>
        </div>
    );
}


export default Home;