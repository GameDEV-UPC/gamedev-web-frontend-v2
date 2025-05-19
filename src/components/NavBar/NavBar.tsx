import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import NoiseButton from "./NoiseButton.tsx";

import defaultProfileIcon from "../assets/images/profile-icon-default.png";
import EffectText from "../EffectText/EffectText.tsx";

function NavBar() {
  const [activeLink, setActiveLink] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const options = [
    { value: "1", label: "My Stats", path: "/mystats" },
    { value: "2", label: "Home", path: "/main" },
    { value: "3", label: "About", path: "/about" },
    { value: "4", label: "Marble", path: "/tutorial" },
  ];

  useEffect(() => {
    const pathMap = {
      "/mystats": 0,
      "/leaderboard": 1,
      "/about": 2,
    };

    // Set active link based on path
    setActiveLink(pathMap[location.pathname] ?? -1);
  }, [location.pathname]);

  return (
    <header className="nav-container">
      <div className="logo">
        <EffectText className="effect-text">GAMEDEV</EffectText>
      </div>

      <NoiseButton options={options} />
    </header>
  );
}

export default NavBar;
