'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, ChevronLeft, Check, Users, Zap, Coffee, Palmtree, Landmark, Trees, GlassWater, Hotel, Home, HelpCircle, Calendar, MessageSquare, User, Mail, Send, Camera } from 'lucide-react';

const destinations = [
  { id: 'valle-de-guadalupe', name: 'Valle de Guadalupe', image: '/images/dest-valle.png' },
  { id: 'mexico-city', name: 'Mexico City', image: '/images/dest-mexico-city.png' },
  { id: 'puerto-vallarta', name: 'Puerto Vallarta', image: '/images/dest-puerto-vallarta.png' },
  { id: 'tulum', name: 'Tulum', image: '/images/dest-tulum.png' },
  { id: 'san-miguel-de-allende', name: 'San Miguel de Allende', image: '/images/dest-san-miguel.png' },
  { id: 'los-cabos', name: 'Los Cabos', image: '/images/dest-los-cabos.png' },
  { id: 'puerto-escondido', name: 'Puerto Escondido', image: '/images/dest-puerto-escondido.png' },
];

const travelerTypes = [
  { id: 'family', label: 'With my family', icon: <Users size={24} /> },
  { id: 'partner', label: 'With my partner', icon: <div className="flex"><User size={24} className="mr-[-8px]" /><User size={24} /></div> },
  { id: 'friends', label: 'With friends', icon: <Users size={24} /> },
  { id: 'solo', label: 'Solo', icon: <User size={24} /> },
];

const paces = [
  { id: 'pack-it-in', label: 'Pack it in', description: 'Active & exploring', icon: <Zap size={24} /> },
  { id: 'slow-mornings', label: 'Slow mornings', description: 'Relaxed & easy', icon: <Coffee size={24} /> },
  { id: 'both', label: 'A little of both', description: 'Balanced pace', icon: <div className="flex space-x-1"><Zap size={18} /><Coffee size={18} /></div> },
];

const vibes = [
  { id: 'beach', label: 'Beach & relaxation', icon: <Palmtree size={20} /> },
  { id: 'culture', label: 'Culture & history', icon: <Landmark size={20} /> },
  { id: 'nature', label: 'Nature & adventure', icon: <Trees size={20} /> },
  { id: 'food', label: 'Food, wine & nightlife', icon: <GlassWater size={20} /> },
];

const accommodations = [
  { id: '5star', label: 'Iconic 5-star hotel', icon: <Hotel size={24} /> },
  { id: 'boutique', label: 'Boutique hideaway', icon: <Camera size={24} /> },
  { id: 'villa', label: 'Private villa', icon: <Home size={24} /> },
  { id: 'recommend', label: 'Whatever you recommend', icon: <HelpCircle size={24} /> },
];

const timelines = [
  { id: '3months', label: 'Next 3 months', icon: <Calendar size={24} /> },
  { id: '6months', label: '3-6 months out', icon: <Calendar size={24} /> },
  { id: 'dreaming', label: 'Just dreaming for now', icon: <HelpCircle size={24} /> },
];

export default function TripQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDestination = searchParams.get('destination') || '';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: initialDestination,
    travelerType: '',
    pace: '',
    vibes: [] as string[],
    accommodation: '',
    timeline: '',
    specialRequest: '',
    name: '',
    email: '',
    whatsapp: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 8;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => { if (step < totalSteps) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };
  const updateField = (key: string, value: any) => { setFormData({ ...formData, [key]: value }); };

  const toggleVibe = (vibeId: string) => {
    const currentVibes = [...formData.vibes];
    if (currentVibes.includes(vibeId)) {
      updateField('vibes', currentVibes.filter(v => v !== vibeId));
    } else {
      updateField('vibes', [...currentVibes, vibeId]);
    }
  };

  const handleSingleSelect = (key: string, value: string) => {
    updateField(key, value);
    setTimeout(nextStep, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-gold/20">
            <Check className="text-brand-gold" size={40} />
          </div>
          <h2 className="editorial-title italic mb-6 text-white">We’re already dreaming up your trip.</h2>
          <p className="editorial-paragraph mb-10 text-white/60">
            Thank you, {formData.name.split(' ')[0]}. We'll reach out within 24 hours.
          </p>
          <button onClick={() => router.push('/')} className="btn-gold">Return Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">Step {step} of {totalSteps}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
          <motion.div animate={{ width: `${progress}%` }} className="absolute left-0 top-0 h-full bg-brand-gold" />
        </div>
      </div>

      <div className="min-h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {step === 1 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair mb-8 text-white">Where would you like to go?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {destinations.map((dest) => (
                    <div key={dest.id} onClick={() => handleSingleSelect('destination', dest.id)} className={`relative h-40 group cursor-pointer overflow-hidden rounded-sm border-2 transition-all ${formData.destination === dest.id ? 'border-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'border-transparent'}`}>
                      <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-brand-dark/40" />
                      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                        <span className="text-white font-playfair text-lg">{dest.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair mb-8 text-white">Who are you traveling with?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {travelerTypes.map((type) => (
                    <div key={type.id} onClick={() => handleSingleSelect('travelerType', type.id)} className={`p-8 bg-brand-secondary border-2 cursor-pointer flex items-center space-x-6 hover:bg-white/5 transition-all ${formData.travelerType === type.id ? 'border-brand-gold' : 'border-white/5'}`}>
                      <div className="text-brand-gold">{type.icon}</div>
                      <span className="text-xl text-white">{type.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair mb-8 text-white">What’s your ideal pace?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {paces.map((pace) => (
                    <div key={pace.id} onClick={() => handleSingleSelect('pace', pace.id)} className={`p-8 bg-brand-secondary border-2 cursor-pointer text-center hover:bg-white/5 transition-all ${formData.pace === pace.id ? 'border-brand-gold' : 'border-white/5'}`}>
                      <div className="text-brand-gold mb-4 flex justify-center">{pace.icon}</div>
                      <div className="text-lg text-white mb-2">{pace.label}</div>
                      <div className="text-xs text-white/40">{pace.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair mb-2 text-white">What vibes are you seeking?</h2>
                <p className="text-white/40 mb-8 uppercase text-[10px] tracking-widest">Multi-select available</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vibes.map((vibe) => (
                    <div key={vibe.id} onClick={() => toggleVibe(vibe.id)} className={`p-6 bg-brand-secondary border-2 cursor-pointer flex items-center justify-between hover:bg-white/5 transition-all ${formData.vibes.includes(vibe.id) ? 'border-brand-gold' : 'border-white/5'}`}>
                      <div className="flex items-center space-x-4">
                        <div className="text-brand-gold">{vibe.icon}</div>
                        <span className="text-lg text-white">{vibe.label}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${formData.vibes.includes(vibe.id) ? 'bg-brand-gold border-brand-gold' : 'border-white/10'}`}>
                        {formData.vibes.includes(vibe.id) && <Check size={14} className="text-brand-dark" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair mb-8 text-white">Preferred style of stay?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accommodations.map((acc) => (
                    <div key={acc.id} onClick={() => handleSingleSelect('accommodation', acc.id)} className={`p-6 bg-brand-secondary border-2 cursor-pointer flex items-center space-x-6 hover:bg-white/5 transition-all ${formData.accommodation === acc.id ? 'border-brand-gold' : 'border-white/5'}`}>
                      <div className="text-brand-gold">{acc.icon}</div>
                      <span className="text-lg text-white">{acc.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair mb-8 text-white">When are you looking to travel?</h2>
                <div className="grid grid-cols-1 gap-4">
                  {timelines.map((time) => (
                    <div key={time.id} onClick={() => handleSingleSelect('timeline', time.id)} className={`p-6 bg-brand-secondary border-2 cursor-pointer flex items-center space-x-6 hover:bg-white/5 transition-all ${formData.timeline === time.id ? 'border-brand-gold' : 'border-white/5'}`}>
                      <div className="text-brand-gold">{time.icon}</div>
                      <span className="text-lg text-white">{time.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair mb-8 text-white">Any special requests?</h2>
                <textarea value={formData.specialRequest} onChange={(e) => updateField('specialRequest', e.target.value)} placeholder="Special occasions, dietary needs..." className="w-full bg-brand-secondary border border-white/10 p-8 text-white text-lg focus:outline-none focus:border-brand-gold/50 h-48 rounded-sm" />
              </div>
            )}

            {step === 8 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-playfair mb-8 text-white">How should we reach you?</h2>
                <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} /><input type="text" required value={formData.name} placeholder="Full Name" className="w-full bg-brand-secondary border border-white/10 p-5 pl-14 text-white focus:outline-none focus:border-brand-gold/50 rounded-sm" onChange={(e) => updateField('name', e.target.value)} /></div>
                <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} /><input type="email" required value={formData.email} placeholder="Email Address" className="w-full bg-brand-secondary border border-white/10 p-5 pl-14 text-white focus:outline-none focus:border-brand-gold/50 rounded-sm" onChange={(e) => updateField('email', e.target.value)} /></div>
                <div className="relative"><MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} /><input type="text" value={formData.whatsapp} placeholder="WhatsApp (Optional)" className="w-full bg-brand-secondary border border-white/10 p-5 pl-14 text-white focus:outline-none focus:border-brand-gold/50 rounded-sm" onChange={(e) => updateField('whatsapp', e.target.value)} /></div>
                <button type="submit" className="w-full btn-gold py-6 flex items-center justify-center space-x-4 group"><span className="uppercase tracking-[0.4em] text-sm">Design My Itinerary</span><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
        <button onClick={prevStep} disabled={step === 1} className={`flex items-center space-x-2 text-[10px] uppercase tracking-widest ${step === 1 ? 'opacity-0' : 'text-white/40 hover:text-brand-gold'}`}><ChevronLeft size={14} /><span>Back</span></button>
        {step < 8 && <button onClick={nextStep} className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-brand-gold transition-all"><span>Next</span><ChevronRight size={14} /></button>}
      </div>
    </div>
  );
}
