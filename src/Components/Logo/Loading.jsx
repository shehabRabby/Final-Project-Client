import React from "react";
import { motion } from "framer-motion";

const Wave = ({ delay }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    className="w-3 h-14 rounded-full bg-gradient-to-b from-lime-400 to-emerald-500"
  />
);

const Loading = () => {
  return (
    <div className="w-full h-screen bg-neutral-900 flex items-center justify-center">
      <div className="flex space-x-3">
        <Wave delay={0} />
        <Wave delay={0.15} />
        <Wave delay={0.3} />
        <Wave delay={0.45} />
        <Wave delay={0.6} />
      </div>
    </div>
  );
};

export default Loading;
