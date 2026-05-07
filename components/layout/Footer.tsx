import Link from 'next/link';
import { Logo } from './Navbar';
import { Instagram, Send, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-dark py-20 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center mb-16">
          <Logo className="mb-10 scale-125" />
          
          <div className="flex space-x-10">
            <Link href="#" className="text-white/40 hover:text-brand-gold transition-colors duration-500 flex items-center space-x-2 group">
              <Instagram size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest">Instagram</span>
            </Link>
            <Link href="#" className="text-white/40 hover:text-brand-gold transition-colors duration-500 flex items-center space-x-2 group">
              <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest">Pinterest</span>
            </Link>
            <Link href="#" className="text-white/40 hover:text-brand-gold transition-colors duration-500 flex items-center space-x-2 group">
              <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest">WhatsApp</span>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t border-white/5 pt-16">
          <div className="text-[10px] text-white/20 uppercase tracking-[0.3em] order-2 md:order-1 text-center md:text-left">
            &copy; {new Date().getFullYear()} Vivir Travel. All rights reserved.
          </div>
          
          <div className="flex justify-center space-x-8 order-1 md:order-2">
            <Link href="#" className="text-[10px] text-white/40 uppercase tracking-widest hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="text-[10px] text-white/40 uppercase tracking-widest hover:text-white transition-colors">Terms</Link>
          </div>
          
          <div className="text-[10px] text-white/20 uppercase tracking-[0.3em] text-center md:text-right order-3">
            Travel as a way of living.
          </div>
        </div>
      </div>
    </footer>
  );
};
