"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <motion.section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
      animate={{
        backgroundColor: [
          "#ffffff", // White
          "#fff8e1", // Light Amber
          "#fff3e0", // Light Orange
          "#ffffff", // White
        ],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle noise texture overlay for a premium feel */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] z-10"></div>
        
        {/* Animated Background Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40rem] h-[40rem] bg-orange-400/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[45rem] h-[45rem] bg-yellow-400/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] left-[20%] w-[35rem] h-[35rem] bg-pink-400/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 inline-block px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-600 font-semibold text-sm tracking-wide"
        >
          Varanasi's Best Creative Marketing Agency
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight flex flex-col md:flex-row flex-wrap justify-center items-center gap-x-4 md:gap-x-6 gap-y-2">
          <div className="flex gap-x-4 md:gap-x-6">
            {["Wear", "the"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex gap-x-4 md:gap-x-6">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="inline-block"
            >
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"
              >
                Crown
              </motion.span>
            </motion.span>
            <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="inline-block"
            >
              of
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="inline-block"
            >
               <motion.span
                 animate={{ y: [0, -8, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"
              >
                Success
              </motion.span>
            </motion.span>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-600 mb-10 max-w-3xl"
        >
          Video editing, design, and growth strategies krafted by humans, for humans.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-4 px-10 rounded-full shadow-[0_0_30px_rgba(197,155,39,0.3)] transition-all text-lg flex items-center gap-2 group"
            >
              Let's Talk About Your Brand
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
