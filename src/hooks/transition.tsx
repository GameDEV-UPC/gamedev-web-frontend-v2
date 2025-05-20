import { motion } from "framer-motion";
import React from "react";

const transition = (OgComponent: React.ComponentType<any>) => {
  const textStyle: React.CSSProperties = {
    color: "#fff",
    fontSize: "5rem",
    fontWeight: 900,
    letterSpacing: "0.2em",
    userSelect: "none",
    fontFamily: "Press Start 2P",
    textTransform: "uppercase",
  };

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    transformOrigin: "top",
    zIndex: 9999,
    pointerEvents: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const containerStyleSlideOut = {
    ...containerStyle,
    transformOrigin: "bottom",
  };

  return (props: any) => (
    <>
      <motion.div
        className="slide-in"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={containerStyle}
      >
        <h2 style={textStyle}>GAMEDEV</h2>
      </motion.div>

      <OgComponent {...props} />

      <motion.div
        className="slide-out"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={containerStyleSlideOut}
      >
        <h2 style={textStyle}>GAMEDEV</h2>
      </motion.div>
    </>
  );
};

export default transition;
