import { Suspense } from 'react';
import TripQuiz from './TripQuiz';

export default function PlanMyTripPage() {
  return (
    <main className="min-h-screen bg-brand-dark pt-32">
      <div className="container mx-auto">
        <div className="text-center mb-12 px-6">
          <span className="editorial-subtitle">Bespoke Curation</span>
          <h1 className="editorial-title italic">Plan Your <span className="gold-gradient">Escape</span></h1>
        </div>
        
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <TripQuiz />
        </Suspense>
      </div>
    </main>
  );
}
