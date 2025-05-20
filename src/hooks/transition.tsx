import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import "./transition.css";
export const PageTransitionContext = React.createContext<{
  startTransition: (path: string) => void;
} | null>(null);

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showText, setShowText] = useState(false);

  // Para controlar navegación luego de animación
  useEffect(() => {
    if (!isAnimating) return;

    // Cuando cortina baja, navegamos
    if (nextPath) {
      setTimeout(() => {
        window.history.pushState({}, "", nextPath);
        setShowText(true);
        setTimeout(() => {
          setIsAnimating(false);
          setNextPath(null);
        }, 300); // Duración animación subida
      }, 300); // Duración animación bajada
    }
  }, [isAnimating, nextPath]);

  const startTransition = (path: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowText(true);
    setNextPath(path);
  };

  return (
    <PageTransitionContext.Provider value={{ startTransition }}>
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="transition-container"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",

              transformOrigin: "top",
              zIndex: 9999,
              pointerEvents: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showText && <h2 className="transition-text">GAMEDEV</h2>}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </PageTransitionContext.Provider>
  );
}
