import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import AnimatedText from "@components/AnimatedText/AnimatedText.tsx";
import EffectText from "../EffectText/EffectText.tsx";

function NavBar() {
    const [activeLink, setActiveLink] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    const options = [
        { value: 0, label: "My Stats", path: "/mystats" },
        { value: 1, label: "Home", path: "/main" },
        { value: 2, label: "About", path: "/about" },
    ];

    useEffect(() => {
        const pathIndex = options.findIndex(option => option.path === location.pathname);
        if (pathIndex !== -1) {
            setActiveLink(pathIndex);
        }
    }, [location.pathname]);

    const handleNavigation = (index: number, path: string) => {
        setActiveLink(index);
        navigate(path);
    };

    return (
        <header className="navbar-container">
            <div className="logo">
                <EffectText
                    fontSize="2.2rem"
                    pixelMode
                    borderOffset={3.0}
                >
                    GAMEDEV
                </EffectText>
            </div>

            <nav className="nav-options">
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
