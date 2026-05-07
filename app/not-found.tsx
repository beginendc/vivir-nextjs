import Link from 'next/link';
import { Logo } from '@/components/layout/Navbar';

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-brand-dark px-6 text-center">
      <Logo className="mb-12 opacity-50" />
      
      <h1 className="editorial-title italic mb-6">This page got lost <br /> somewhere <span className="gold-gradient">beautiful.</span></h1>
      
      <p className="editorial-paragraph max-w-md mb-12 opacity-80">
        While the destination you're looking for is missing, your journey doesn't have to end here.
      </p>
      
      <Link 
        href="/" 
        className="px-10 py-4 border border-brand-gold text-brand-gold text-xs uppercase tracking-[0.4em] hover:bg-brand-gold hover:text-brand-dark transition-all duration-500 rounded-sm"
      >
        Back to the Beginning
      </Link>
    </main>
  );
}
