'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

export const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    destination: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API logic will be handled by Full-stack Engineer
    console.log('Form submitted:', formState);
    alert('Thank you. We are already dreaming up your trip.');
  };

  return (
    <section id="contact" className="section-padding bg-brand-dark">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="editorial-subtitle"
            >
              Inquiry
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="editorial-title mb-8"
            >
              Let’s Plan <br />
              <span className="italic gold-gradient">Your Escape</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="editorial-paragraph mb-12"
            >
              Whether it’s a milestone celebration or a spontaneous getaway, our team is ready to design a journey that transcends the ordinary.
            </motion.p>

            <div className="space-y-8">
              {[
                { icon: <Mail className="text-brand-gold" size={20} />, label: 'Email', value: 'hello@vivir.travel' },
                { icon: <Phone className="text-brand-gold" size={20} />, label: 'WhatsApp', value: '+52 (55) 1234 5678' },
                { icon: <MapPin className="text-brand-gold" size={20} />, label: 'Location', value: 'Mexico City | Valle de Guadalupe' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="flex items-center space-x-6"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">{item.label}</div>
                    <div className="text-white/80 font-sans tracking-wide">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-brand-secondary p-8 md:p-12 rounded-sm border border-white/5 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="E.g. Julianne Moore"
                  className="w-full bg-brand-dark/50 border border-white/10 p-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/10"
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-gold ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="email@luxury.com"
                    className="w-full bg-brand-dark/50 border border-white/10 p-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/10"
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-gold ml-1">Preferred Destination</label>
                  <select 
                    className="w-full bg-brand-dark/50 border border-white/10 p-4 text-white/50 focus:outline-none focus:border-brand-gold/50 transition-colors"
                    onChange={(e) => setFormState({...formState, destination: e.target.value})}
                  >
                    <option value="">Select Destination</option>
                    <option value="valle">Valle de Guadalupe</option>
                    <option value="cdmx">Mexico City</option>
                    <option value="pv">Puerto Vallarta</option>
                    <option value="tulum">Tulum</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold ml-1">Your Vision</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about the trip you're dreaming of..."
                  className="w-full bg-brand-dark/50 border border-white/10 p-4 text-white focus:outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/10"
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full btn-gold py-5 mt-4 flex items-center justify-center space-x-4 group"
              >
                <span className="uppercase tracking-[0.3em] text-xs">Send Inquiry</span>
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
