"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function Counter({ from, to, duration, suffix = "", prefix = "" }: { from: number, to: number, duration: number, suffix?: string, prefix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing out quart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(to);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={nodeRef}>{prefix}{count}{suffix}</span>;
}

export default function TrustSection() {
  const testimonials = [
    {
      id: 1,
      type: "metric",
      title: "Script rewritten",
      result: "300% increase in watch time",
      span: "col-span-1 md:col-span-2"
    },
    {
      id: 2,
      type: "quote",
      name: "Sarah J.",
      role: "Tech YouTuber",
      initials: "SJ",
      color: "from-blue-400 to-indigo-500",
      quote: "Crown Media didn't just edit my videos, they completely transformed my storytelling. My channel grew faster in 3 months than it did in 2 years.",
      span: "col-span-1 md:col-span-2"
    },
    {
      id: 3,
      type: "metric",
      title: "Thumbnail redesigned",
      result: "2x click-through rate",
      span: "col-span-1 md:col-span-2"
    },
    {
      id: 4,
      type: "quote",
      name: "Mark T.",
      role: "SaaS Founder",
      initials: "MT",
      color: "from-emerald-400 to-teal-500",
      quote: "The brand growth strategy was spot on. They felt like an in-house team rather than an agency. Highly recommend their holistic approach.",
      span: "col-span-1 md:col-span-4"
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-zinc-900 relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-16"
          >
            Results That Speak <span className="text-orange-500">Louder Than Promises</span>
          </motion.h2>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center pt-8 md:pt-0"
            >
              <div className="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tighter">
                <Counter from={0} to={50} duration={2} suffix="+" />
              </div>
              <p className="text-orange-400 font-medium uppercase tracking-widest text-sm">Brands Scaled</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center pt-8 md:pt-0"
            >
              <div className="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tighter">
                <Counter from={0} to={1} duration={2} suffix="M+" />
              </div>
              <p className="text-orange-400 font-medium uppercase tracking-widest text-sm">Views Generated</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center pt-8 md:pt-0"
            >
              <div className="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tighter">
                <Counter from={0} to={98} duration={2.5} suffix="%" />
              </div>
              <p className="text-orange-400 font-medium uppercase tracking-widest text-sm">Client Retention</p>
            </motion.div>
          </div>
        </div>

        {/* Masonry / Bento Grid for Proof */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
        >
          {testimonials.map((item) => (
            <div 
              key={item.id} 
              className={`${item.span} bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors`}
            >
              {item.type === "metric" ? (
                <div className="flex flex-col h-full justify-center">
                  <span className="text-gray-400 text-sm mb-2 uppercase tracking-wider">{item.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-500 text-2xl font-bold">→</span>
                    <span className="text-xl md:text-2xl font-semibold text-white">{item.result}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="mb-6 text-orange-400 opacity-50">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg md:text-xl mb-8 flex-grow leading-relaxed">
                    "{item.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${item.color}`}>
                      {item.initials}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{item.name}</h4>
                      <p className="text-gray-500 text-sm">{item.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
