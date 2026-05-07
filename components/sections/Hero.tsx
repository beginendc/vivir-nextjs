'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-valle.png"
          alt="Valle de Guadalupe Vineyards"
          fill
          priority
          className="object-cover scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-transparent to-brand-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="editorial-subtitle"
        >
          Vivir Travel — Luxury Travel Boutique
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="editorial-title max-w-5xl mb-8"
        >
          Discover Mexico’s <br className="hidden md:block" />
          <span className="italic gold-gradient">Hidden Elegance</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="editorial-paragraph max-w-2xl mb-12"
        >
          Curated journeys to Mexico’s most extraordinary destinations. Every detail, thoughtfully designed.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link 
            href="#destinations" 
            className="px-10 py-4 border border-brand-gold text-brand-gold text-sm uppercase tracking-[0.3em] hover:bg-brand-gold hover:text-brand-dark transition-all duration-500 rounded-sm"
          >
            Explore Destinations
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-[10px] uppercase tracking-widest flex flex-col items-center"
      >
        <span className="mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative">
          <motion.div 
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-full h-1/4 bg-brand-gold"
          />
        </div>
      </motion.div>
    </section>
  );
};
