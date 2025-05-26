import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import NoiseButton from "./NoiseButton.tsx";

import { useAuth } from "../../hooks/AuthProvider.tsx";
import BitButton from "../BitButton/BitButton.tsx";
import { FaBars, FaTimes } from "react-icons/fa";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [confirmLogout, setConfirmLogout] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { logout, user } = useAuth();

    const handleLogout = () => {
        setConfirmLogout(true);
        setMenuOpen(false); // optional: close menu
    };

    const confirmLogoutNow = () => {
        logout();
        navigate("/login");
    };

    const cancelLogout = () => {
        setConfirmLogout(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const options = [
        { value: "1", label: "My Stats", path: "/mystats" },
        { value: "2", label: "Home", path: "/main" },
        { value: "4", label: "Marble", path: "/tutorial" },
    ];

    useEffect(() => {
        const pathMap: Record<string, number> = {
            "/mystats": 0,
            "/leaderboard": 1,
            "/about": 2,
        };

        setMenuOpen(false); // Close menu on navigation
    }, [location.pathname]);

    if (confirmLogout) {
        return (
            <div className="logout-confirm-only">
                <h2>Are you sure you want to logout?</h2>
                <div className="logout-buttons">
                    <BitButton onClick={confirmLogoutNow} className="accept-button">
                        Yes, Logout
                    </BitButton>
                    <BitButton onClick={cancelLogout} className="cancel-button">
                        Cancel
                    </BitButton>
                </div>
            </div>
        );
    }

    return (
        <header className="nav-container">
            <div className="logo">
                <h1>GAMEDEV</h1>
            </div>

            <div className="nav-toggle" onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <NoiseButton options={options} />
                <BitButton className="logout-button" onClick={handleLogout}>
                    LOGOUT
                </BitButton>
            </div>
        </header>
    );
}

export default NavBar;
