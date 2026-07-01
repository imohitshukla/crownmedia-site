"use client";

import { motion } from "framer-motion";

export default function ServicesGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="services" className="py-24 bg-zinc-950 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Solutions That <span className="text-orange-500">Move The Needle</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            We don't just deliver services. We deliver results.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Service 1: Video Editing (Large) */}
          <motion.div 
            variants={itemVariants}
            className="group md:col-span-2 lg:col-span-2 rounded-3xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.3)] h-[400px]"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/80 to-zinc-950/20" />
            
            <div className="flex flex-col h-full z-10 relative p-8">
              <div className="mb-6 bg-orange-500/20 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center border border-orange-500/30">
                <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Stop the scroll with high-retention editing.</h3>
              <p className="text-gray-300 text-lg max-w-lg mt-auto">
                From raw footage to scroll-stopping content. We craft videos that keep viewers glued, boost watch time, and turn casual scrollers into subscribers.
              </p>
            </div>
          </motion.div>

          {/* Service 2: Graphic Design */}
          <motion.div 
            variants={itemVariants}
            className="group rounded-3xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.3)] h-[400px]"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/80 to-zinc-950/20" />
            
            <div className="flex flex-col h-full z-10 relative p-8">
              <div className="mb-6 bg-orange-500/20 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center border border-orange-500/30">
                <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Visuals that demand attention.</h3>
              <p className="text-gray-300 mt-auto">
                Thumbnails, banners, social assets — designed to pop in a sea of content.
              </p>
            </div>
          </motion.div>

          {/* Service 3: Scriptwriting */}
          <motion.div 
            variants={itemVariants}
            className="group rounded-3xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.3)] h-[400px]"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=800&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/80 to-zinc-950/20" />
            
            <div className="flex flex-col h-full z-10 relative p-8">
              <div className="mb-6 bg-orange-500/20 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center border border-orange-500/30">
                <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Words that convert viewers into loyal fans.</h3>
              <p className="text-gray-300 mt-auto">
                Data-driven scripts with hooks that grab and stories that stick.
              </p>
            </div>
          </motion.div>

          {/* Service 4: Brand Growth (Large) */}
          <motion.div 
            variants={itemVariants}
            className="group md:col-span-2 lg:col-span-2 rounded-3xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.3)] h-[400px]"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/80 to-zinc-950/20" />
            
            <div className="flex flex-col h-full z-10 relative p-8">
              <div className="mb-6 bg-orange-500/20 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center border border-orange-500/30">
                <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Scale your voice across every platform.</h3>
              <p className="text-gray-300 text-lg max-w-lg mt-auto">
                Strategy, analytics, and execution to grow your digital footprint from zero to unforgettable.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
