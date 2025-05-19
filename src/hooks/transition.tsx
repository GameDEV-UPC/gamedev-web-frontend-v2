import { motion } from "framer-motion";
import React from "react";

const transition = (OgComponent: React.ComponentType<any>) => {
  return (props: any) => (
    <>
      <motion.div
        className="slide-in"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <OgComponent {...props} />
      <motion.div
        className="slide-out"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default transition;
