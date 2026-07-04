"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in the required fields (Name, Email, and Message).");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          serviceOfInterest: formData.purpose, // Mapping purpose to serviceOfInterest for the API
          message: `Phone: ${formData.phone}\nMessage: ${formData.message}`
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
    <section id="contact" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Connect With Us
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100 mb-8"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                  ✓
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Thanks, {formData.name.split(' ')[0]}! 🎉</h3>
                <p className="text-xl text-gray-600">
                  We're reviewing your request and will reach out to {formData.email} shortly.
                </p>
                <button 
                  onClick={() => {
                    setStatus("idle");
                    setFormData({name: "", email: "", purpose: "", phone: "", message: ""});
                  }}
                  className="mt-8 text-orange-500 hover:text-orange-600 font-semibold underline underline-offset-4"
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
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <input 
                      type="text" 
                      required
                      placeholder="Your name*" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 focus:border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 outline-none transition-colors font-medium"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <input 
                      type="email" 
                      required
                      placeholder="Email address*" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 focus:border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 outline-none transition-colors font-medium"
                    />
                  </div>
                  {/* Purpose */}
                  <div>
                    <input 
                      type="text" 
                      placeholder="Purpose" 
                      value={formData.purpose}
                      onChange={e => setFormData({...formData, purpose: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 focus:border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 outline-none transition-colors font-medium"
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone number" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 focus:border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 outline-none transition-colors font-medium"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Your message...*"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 focus:border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 outline-none resize-none transition-colors font-medium"
                  />
                </div>

                {/* Error Message */}
                {status === "error" && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-100">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <button 
                    type="submit"
                    disabled={status === "submitting"}
                    className={`px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold text-lg transition-colors shadow-sm flex items-center justify-center gap-2 ${status === "submitting" ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mail */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-8 flex items-center gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
              <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Mail Here</h4>
              <p className="text-gray-500 text-sm">princemaurya7187@gmail.com</p>
            </div>
          </motion.div>

          {/* Visit */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-8 flex items-center gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
              <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Visit Here</h4>
              <p className="text-gray-500 text-sm">Varanasi, Uttar Pradesh<br/>India</p>
            </div>
          </motion.div>

          {/* Call */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-8 flex items-center gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
              <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Call Here</h4>
              <p className="text-gray-500 text-sm">+918423217187</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
