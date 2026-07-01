"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    budget: 5000,
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const budgetLabels: Record<number, string> = {
    500: "$500",
    1000: "$1K",
    2500: "$2.5K",
    5000: "$5K",
    10000: "$10K+"
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    // snap to nearest predefined value
    const stops = [500, 1000, 2500, 5000, 10000];
    const closest = stops.reduce((prev, curr) => 
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
    setFormData(prev => ({ ...prev, budget: closest }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service) {
      setStatus("error");
      setErrorMessage("Please fill in the required fields (Name, Email, and Service).");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          serviceOfInterest: formData.service
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-900 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Let's Build Something <span className="text-orange-500">Amazing</span> Together
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            Tell us about your project in your own words.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                  ✓
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Thanks, {formData.name.split(' ')[0]}! 🎉</h3>
                <p className="text-xl text-gray-400">
                  We're reviewing your request and will reach out to {formData.email} shortly.
                </p>
                <button 
                  onClick={() => {
                    setStatus("idle");
                    setFormData({name: "", service: "", budget: 5000, email: "", message: ""});
                  }}
                  className="mt-8 text-orange-500 hover:text-orange-400 font-medium underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-10 text-xl md:text-2xl md:leading-relaxed text-gray-300 font-light"
              >
                {/* Sentence 1 */}
                <div className="flex flex-wrap items-end gap-3 leading-loose">
                  <span>Hey there! I'm</span>
                  <input 
                    type="text" 
                    required
                    placeholder="your name" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="bg-transparent border-b-2 border-gray-700 focus:border-orange-500 outline-none px-2 py-1 text-white placeholder-gray-600 font-medium min-w-[200px] flex-grow md:flex-grow-0 transition-colors"
                  />
                  <span>, and I need help with</span>
                  <div className="relative flex-grow md:flex-grow-0">
                    <select 
                      required
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="appearance-none bg-transparent border-b-2 border-gray-700 focus:border-orange-500 outline-none px-2 py-1 pr-8 text-orange-400 font-medium w-full cursor-pointer transition-colors"
                    >
                      <option value="" disabled className="bg-zinc-900 text-gray-500">select a service...</option>
                      <option value="Video Editing" className="bg-zinc-900">Video Editing</option>
                      <option value="Graphic Design" className="bg-zinc-900">Graphic Design</option>
                      <option value="Scriptwriting" className="bg-zinc-900">Scriptwriting</option>
                      <option value="Brand Growth" className="bg-zinc-900">Brand Growth</option>
                      <option value="A bit of everything" className="bg-zinc-900">A bit of everything</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-orange-400">
                      <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                  <span>.</span>
                </div>

                {/* Sentence 2 */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 leading-loose">
                  <span>My budget is around <span className="text-white font-bold inline-block w-20 text-center">{budgetLabels[formData.budget]}</span>.</span>
                  <div className="flex-grow max-w-md pt-2">
                    <input 
                      type="range" 
                      min="500" 
                      max="10000" 
                      step="1"
                      value={formData.budget}
                      onChange={handleSliderChange}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                  </div>
                </div>

                {/* Sentence 3 */}
                <div className="flex flex-wrap items-end gap-3 leading-loose">
                  <span>You can reach me at</span>
                  <input 
                    type="email" 
                    required
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="bg-transparent border-b-2 border-gray-700 focus:border-orange-500 outline-none px-2 py-1 text-white placeholder-gray-600 font-medium min-w-[250px] flex-grow md:flex-grow-0 transition-colors"
                  />
                  <span>.</span>
                </div>

                {/* Sentence 4 */}
                <div className="flex flex-col gap-3">
                  <span>Anything else you'd like us to know?</span>
                  <textarea 
                    rows={3}
                    placeholder="Tell us a bit more about your brand and goals..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-black/20 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none transition-all text-lg font-medium"
                  />
                </div>

                {/* Error Message */}
                {status === "error" && (
                  <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === "submitting"}
                    className={`w-full md:w-auto px-10 py-5 bg-orange-500 text-white rounded-full font-bold text-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center gap-3 ${status === "submitting" ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send My Message ✨"
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
