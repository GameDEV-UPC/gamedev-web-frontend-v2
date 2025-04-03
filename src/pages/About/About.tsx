import { useState } from "react";
import "./About.css";
import EffectText from "@components/EffectText/EffectText.tsx";



function About() {
    const [activeSection, setActiveSection] = useState<"engine" | "videogames">("engine");

    const toggleSection = () => {
        setActiveSection((prev) => (prev === "engine" ? "videogames" : "engine"));
    };

    return (
        <div className="container">
            {/* Descripción global */}
            <EffectText

            >
                About Our Association
            </EffectText>
            <section className="description fade-in">
                <p>
                    We are a group of passionate students from the EPSEVG, dedicated to creating
                    innovative video games and developing a state-of-the-art graphics engine.
                </p>
            </section>

            {/* Sección dinámica con animación de fade */}
            <section className={`members-section ${activeSection}`}>
                {/* Botón único para alternar */}
                <div className="switch-container">
                    <button
                        onClick={toggleSection}
                        className="switch-button"
                        data-alt-text={activeSection === "engine" ? "VideoGames" : "Engine"}
                    >
                        {activeSection === "engine" ? "Engine" : "VideoGames"}
                    </button>
                </div>
                <EffectText

                >
                    {activeSection === "engine" ? "Engine Team" : "Video Games Team"}
                </EffectText>
                <p className={"description fade-in"}>
                    {activeSection === "engine"
                        ? "Our Engine team is dedicated to developing a cutting-edge graphics engine using C++. They focus on optimizing performance and creating realistic visual effects."
                        : "Our Video Games team specializes in crafting engaging and innovative games using Unity. They combine storytelling, gameplay mechanics, and creativity to deliver unforgettable experiences."}
                </p>
                <div className="members-grid fade-in">
                    {(activeSection === "engine"
                            ? ["Alice", "Bob", "Charlie"]
                            : ["Dave", "Eve", "Frank"]
                    ).map((member, idx) => (
                        <div className="member-card" key={idx}>
                            <img
                                src={`https://via.placeholder.com/150?text=${member}`}
                                alt={member}
                                className="member-image"
                            />
                            <p className="member-name">{member}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>

    );
}

export default About;
