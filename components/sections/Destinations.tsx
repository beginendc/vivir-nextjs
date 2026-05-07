'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, X, Wine, Utensils, Compass, Waves, Sun, Landmark } from 'lucide-react';
import Link from 'next/link';

const destinations = [
  {
    id: 'valle-de-guadalupe',
    name: 'Valle de Guadalupe',
    tagline: 'Wine Country & Gastronomy',
    description: 'Mexico’s premier wine region, offering Michelin-starred dining and boutique vineyard stays under the Baja sun.',
    image: '/images/dest-valle.png',
    experiences: [
      { name: 'Private Vineyard Tastings', icon: <Wine size={18} /> },
      { name: 'Michelin-Starred Dining', icon: <Utensils size={18} /> },
      { name: 'Hot Air Balloon at Sunrise', icon: <Compass size={18} /> },
      { name: 'Full-Day Private Chauffeur', icon: <Landmark size={18} /> }
    ]
  },
  {
    id: 'mexico-city',
    name: 'Mexico City',
    tagline: 'Culture & Art',
    description: 'A vibrant metropolis where ancient history meets contemporary art, world-class gastronomy, and legendary nightlife.',
    image: '/images/dest-mexico-city.png',
    experiences: [
      { name: 'Private Museum Tours', icon: <Landmark size={18} /> },
      { name: 'Culinary Immersion', icon: <Utensils size={18} /> },
      { name: 'Architectural Photography', icon: <Compass size={18} /> },
      { name: 'Mezcal & Speakeasy Night', icon: <Wine size={18} /> }
    ]
  },
  {
    id: 'puerto-vallarta',
    name: 'Puerto Vallarta',
    tagline: 'Pacific Coast Luxury',
    description: 'Where the Sierra Madre mountains meet the Pacific, featuring private yacht charters and secluded jungle retreats.',
    image: '/images/dest-puerto-vallarta.png',
    experiences: [
      { name: 'Private Yacht Charter', icon: <Waves size={18} /> },
      { name: 'Jungle Spa Retreat', icon: <Sun size={18} /> },
      { name: 'Seaside Gastronomy', icon: <Utensils size={18} /> },
      { name: 'Sierra Madre Expedition', icon: <Compass size={18} /> }
    ]
  },
  {
    id: 'tulum',
    name: 'Tulum',
    tagline: 'Caribbean Serenity',
    description: 'Eco-chic luxury on the Caribbean coast, offering private cenote explorations and ancient Mayan wisdom.',
    image: '/images/dest-tulum.png',
    experiences: [
      { name: 'Private Ruins at Dawn', icon: <Landmark size={18} /> },
      { name: 'Cenote Exploration', icon: <Waves size={18} /> },
      { name: 'Sound Healing & Wellness', icon: <Sun size={18} /> },
      { name: 'Jungle Fine Dining', icon: <Utensils size={18} /> }
    ]
  },
  {
    id: 'san-miguel-de-allende',
    name: 'San Miguel de Allende',
    tagline: 'Colonial Charm',
    description: 'The soul of Mexico captured in cobblestone streets, artisan workshops, and golden hour gallery walks.',
    image: '/images/dest-san-miguel.png',
    experiences: [
      { name: 'Historic Walking Tour', icon: <Landmark size={18} /> },
      { name: 'Artisan Workshop Day', icon: <Compass size={18} /> },
      { name: 'Underground Wine Cellar', icon: <Wine size={18} /> },
      { name: 'Golden Hour Gallery Walk', icon: <Sun size={18} /> }
    ]
  },
  {
    id: 'los-cabos',
    name: 'Los Cabos',
    tagline: 'Desert Meets Ocean',
    description: 'Dramatic landscapes where the desert meets the sea, known for world-class golf and whale watching expeditions.',
    image: '/images/dest-los-cabos.png',
    experiences: [
      { name: 'Whale Watching', icon: <Waves size={18} /> },
      { name: 'Desert & Beach Golf', icon: <Sun size={18} /> },
      { name: 'Sunset Dinner at The Arch', icon: <Utensils size={18} /> },
      { name: 'Baja Outback Adventure', icon: <Compass size={18} /> }
    ]
  },
  {
    id: 'puerto-escondido',
    name: 'Puerto Escondido',
    tagline: 'Wild Pacific & Oaxacan Soul',
    description: 'The untamed beauty of Oaxaca’s coast, perfect for surf enthusiasts and those seeking authentic mezcal culture.',
    image: '/images/dest-puerto-escondido.png',
    experiences: [
      { name: 'Learn to Surf', icon: <Waves size={18} /> },
      { name: 'Artisan Mezcal Tasting', icon: <Wine size={18} /> },
      { name: 'Birdwatching Lagoon', icon: <Compass size={18} /> },
      { name: 'Sea Turtle Liberation', icon: <Sun size={18} /> }
    ]
  }
];

export const Destinations = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="destinations" className="section-padding bg-brand-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="editorial-subtitle"
          >
            Curated Escapes
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="editorial-title"
          >
            Choose Your <span className="italic">Perspective</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className={`relative h-[600px] group cursor-pointer overflow-hidden rounded-sm transition-all duration-700 ${
                expandedId === dest.id ? 'lg:col-span-2' : ''
              }`}
              onClick={() => setExpandedId(expandedId === dest.id ? null : dest.id)}
            >
              {/* Background Image */}
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${
                  expandedId === dest.id ? 'scale-105' : ''
                }`}
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors duration-500" />

              {/* Content - Default State */}
              <div className={`absolute inset-0 p-8 flex flex-col justify-end transition-opacity duration-500 ${
                expandedId === dest.id ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}>
                <div className="flex items-center space-x-2 text-brand-gold mb-2">
                  <MapPin size={14} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-sans">Explore</span>
                </div>
                <h3 className="text-3xl font-playfair text-white mb-2">{dest.name}</h3>
                <p className="text-sm text-white/60 font-sans tracking-wide uppercase">{dest.tagline}</p>
                
                <div className="mt-6 flex items-center text-brand-gold overflow-hidden">
                  <span className="text-xs uppercase tracking-widest translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500">Discover Experiences</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>

              {/* Content - Expanded State */}
              <AnimatePresence>
                {expandedId === dest.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-brand-dark/95 backdrop-blur-sm p-10 flex flex-col justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button 
                      onClick={() => setExpandedId(null)}
                      className="absolute top-8 right-8 text-white/40 hover:text-brand-gold transition-colors"
                    >
                      <X size={24} />
                    </button>

                    <div className="max-w-xl">
                      <span className="text-brand-gold uppercase tracking-[0.3em] text-xs mb-4 inline-block">{dest.tagline}</span>
                      <h3 className="text-4xl md:text-5xl font-playfair text-white mb-6 italic">{dest.name}</h3>
                      <p className="editorial-paragraph mb-10">{dest.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        {dest.experiences.map((exp, i) => (
                          <div key={i} className="flex items-center space-x-3 text-white/80 group/exp">
                            <div className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover/exp:bg-brand-gold group-hover/exp:text-brand-dark transition-all">
                              {exp.icon}
                            </div>
                            <span className="text-sm tracking-wide">{exp.name}</span>
                          </div>
                        ))}
                      </div>

                      <Link 
                        href={`/plan-my-trip?destination=${dest.id}`}
                        className="btn-gold inline-flex items-center space-x-4 group/btn"
                      >
                        <span className="uppercase tracking-widest text-xs">Plan My Trip to {dest.name}</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
