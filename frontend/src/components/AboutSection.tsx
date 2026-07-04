"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle warm gradient divider at the top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-orange-100/50 border border-gray-200"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744094-24638ea0b3b5?auto=format&fit=crop&w=1600&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-10 leading-tight">
              Real People. Real Passion. <br className="hidden md:block"/>
              <span className="text-orange-500">Real Results.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              We're not a faceless agency. We're a tight-knit crew of editors, designers, writers, and strategists who genuinely care about your growth. When you work with Crown Media, you get a dedicated partner — someone who picks up the phone, understands your brand, and treats your content like their own.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Born from a love for storytelling and a frustration with cookie-cutter agencies, Crown Media exists to give creators and brands the creative firepower they deserve.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
