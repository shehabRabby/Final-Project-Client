import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 overflow-hidden px-6 sm:px-12 py-12">

      {/* Decorative floating blobs */}
      <div className="absolute w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-400/20 rounded-full blur-3xl -bottom-10 right-10 animate-pulse-slower"></div>

      {/* Intro Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mb-16 text-center relative z-10"
      >
        <h1 className="text-5xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
          About ZapShift
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
          ZapShift is your ultimate home-to-home delivery solution. From food, documents, packages, to equipment, we make sending and receiving items effortless, fast, and reliable.
        </p>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mb-16 grid grid-cols-1 sm:grid-cols-2 gap-10"
      >
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Simplifying delivery for everyone. We ensure that every item — whether food, document, or equipment — reaches its destination safely and on time.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">
          <h2 className="text-3xl font-semibold text-purple-600 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To be the most trusted delivery platform, connecting people, businesses, and communities with speed, reliability, and innovation.
          </p>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mb-16 text-center"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { title: "Reliability", color: "bg-blue-400", desc: "Every delivery gets there safely and on time." },
            { title: "Speed", color: "bg-purple-400", desc: "Fast service without compromising quality." },
            { title: "Transparency", color: "bg-pink-400", desc: "Track your deliveries in real-time." },
            { title: "Customer First", color: "bg-green-400", desc: "Users are at the heart of everything." },
            { title: "Innovation", color: "bg-yellow-400", desc: "Continuously improving our platform." },
            { title: "Impact", color: "bg-indigo-400", desc: "We make a positive difference in every delivery." },
          ].map((value, idx) => (
            <motion.div
              key={idx}
              className={`p-6 rounded-3xl shadow-lg text-white ${value.color} hover:scale-105 transition-transform`}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p>{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mb-16 text-center"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-10">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Alice Johnson", role: "CEO & Founder" },
            { name: "Mark Wilson", role: "CTO" },
            { name: "Sophia Lee", role: "Operations Lead" },
            { name: "David Kim", role: "Marketing Director" },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 animate-pulse"></div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Join ZapShift Today</h2>
        <p className="text-gray-700 mb-6">
          Whether you’re sending food, documents, or equipment, ZapShift makes delivery effortless. 
          Let’s innovate, connect, and deliver together.
        </p>
        <button className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-transform transform hover:scale-105">
          Get Started
        </button>
      </motion.section>

      {/* Extra CSS Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.4; }
        }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        @keyframes pulse-slower {
          0%,100% { transform: scale(1); opacity:0.25; }
          50% { transform: scale(1.2); opacity:0.33; }
        }
        .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default About;
