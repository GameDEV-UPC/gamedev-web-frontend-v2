import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import AnimatedText from "../../components/AnimatedText/AnimatedText.tsx";
import EffectText from "../EffectText/EffectText.tsx";

function NavBar() {
  const [activeLink, setActiveLink] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const options = [
    { value: 0, label: "Home", path: "/main" },
    { value: 1, label: "Canicas", path: "/tutorial" },
  ];

  useEffect(() => {
    const pathIndex = options.findIndex(
      (option) => option.path === location.pathname
    );
    if (pathIndex !== -1) {
      setActiveLink(pathIndex);
    }
  }, [location.pathname]);

  const handleNavigation = (index: number, path: string) => {
    setActiveLink(index);
    navigate(path);
    setMenuOpen(false); // cerrar menú al navegar
  };

  return (
    <header className="navbar-container">
      <div className="logo">
        <EffectText fontSize="1.6rem" pixelMode borderOffset={3.0}>
          GAMEDEV
        </EffectText>
      </div>

      <div
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav-options ${menuOpen ? "active" : ""}`}>
        {options.map((option, index) => (
          <label key={option.value} className="nav-label">
            <input
              type="radio"
              name="nav"
              value={option.value}
              checked={activeLink === index}
              onChange={() => handleNavigation(index, option.path)}
              className="nav-radio"
            />
            <span className="nav-text">{option.label}</span>
          </label>
        ))}
      </nav>
    </header>
  );
}

export default NavBar;
