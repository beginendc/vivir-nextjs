import Link from 'next/link';

export const Logo = ({ className }: { className?: string }) => (
  <div className={`flex flex-col items-center group ${className}`}>
    <div className="flex items-center space-x-2 relative">
      {/* Left Wing */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-gold/60 group-hover:rotate-[-10deg] transition-transform duration-700">
        <path d="M4 12C4 12 8 8 12 12C8 12 4 16 4 12Z" fill="currentColor" />
        <path d="M2 12C2 12 6 6 12 12C6 12 2 18 2 12Z" fill="currentColor" opacity="0.5" />
      </svg>
      
      <span className="text-2xl md:text-3xl font-playfair tracking-[0.2em] text-white">VIVIR</span>
      
      {/* Right Wing */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-gold/60 group-hover:rotate-[10deg] transition-transform duration-700">
        <path d="M20 12C20 12 16 8 12 12C16 12 20 16 20 12Z" fill="currentColor" />
        <path d="M22 12C22 12 18 6 12 12C18 12 22 18 22 12Z" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
    <span className="text-[9px] md:text-[10px] tracking-[0.5em] text-brand-gold -mt-1 font-sans font-light">TRAVEL</span>
  </div>
);

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass h-24 transition-all duration-500">
      <div className="container mx-auto h-full flex items-center justify-between px-6 lg:px-12">
        <Link href="/">
          <Logo />
        </Link>
        
        <div className="hidden lg:flex items-center space-x-12">
          {['Destinations', 'About', 'Contact'].map((item) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-[11px] uppercase tracking-[0.3em] text-white/70 hover:text-brand-gold transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
          <Link 
            href="/plan-my-trip" 
            className="px-8 py-3 bg-brand-gold text-brand-dark text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-white transition-all duration-500 rounded-sm"
          >
            Plan My Trip
          </Link>
        </div>
        
        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2">
          <div className="w-6 h-[1px] bg-brand-gold mb-1.5" />
          <div className="w-6 h-[1px] bg-brand-gold" />
        </button>
      </div>
    </nav>
  );
};
