'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Curated Experiences', value: '50+' },
  { label: 'Years of Excellence', value: '8' },
  { label: 'Bespoke Itineraries', value: '100%' }
];

export const About = () => {
  return (
    <section id="about" className="section-padding bg-brand-secondary relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 -skew-x-12 translate-x-1/2" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="editorial-subtitle"
            >
              Our Philosophy
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="editorial-title mb-8"
            >
              Travel as an <br />
              <span className="italic gold-gradient">Art Form</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <p className="editorial-paragraph">
                At Vivir Travel, we believe that true luxury isn’t just about where you stay, but how you experience the world. It’s the sound of waves at dawn, the first sip of a rare vintage, and the stories told in the quiet corners of a bustling city.
              </p>
              <p className="editorial-paragraph">
                We replace traditional staffing with intelligent curation, ensuring every journey is as unique as the traveler. No agendas, no crowds—just bespoke moments thoughtfully designed for those who seek the extraordinary.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-brand-dark/40 backdrop-blur-sm p-8 border-l-2 border-brand-gold/30 hover:border-brand-gold transition-colors duration-500 group"
              >
                <div className="text-5xl md:text-6xl font-playfair gold-gradient mb-2 group-hover:scale-105 transition-transform duration-500 origin-left">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-[0.2em] text-white/50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
