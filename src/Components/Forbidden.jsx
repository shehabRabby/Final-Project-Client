import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-gray-900/60 backdrop-blur-md p-8 rounded-2xl shadow-xl 
        flex flex-col items-center text-center border border-gray-800"
      >
        {/* Floating image */}
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
          alt="forbidden"
          className="w-28 sm:w-32 mb-6 opacity-80"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <h1 className="text-3xl font-bold text-white mb-3">403 — Forbidden</h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8"
        >
          You’re not allowed in this zone 💀 Slide back to somewhere you
          actually have access to.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <Link
            to="/"
            className="flex-1 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            Go to Home
          </Link>

          <Link
            to="/dashboard"
            className="flex-1 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition font-medium"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Forbidden;
