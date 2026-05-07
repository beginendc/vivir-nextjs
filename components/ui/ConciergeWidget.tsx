'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ConciergeWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome to Vivir. Where would you like to go?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        }),
      });

      const data = await response.json();
      if (data.message) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message.content }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'I apologize, but I am having trouble connecting right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="mb-6 w-[350px] md:w-[400px] h-[600px] bg-brand-dark border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden glass"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-brand-secondary">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <span className="text-brand-gold font-playfair text-lg">V</span>
                </div>
                <div>
                  <h3 className="text-white font-playfair tracking-wide font-medium">Concierge</h3>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] text-white/40 uppercase tracking-[0.2em]">Mexico Expert</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/30 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                    m.role === 'user' 
                      ? "bg-brand-gold text-brand-dark rounded-br-none font-medium" 
                      : "bg-white/5 text-white/80 border border-white/10 rounded-bl-none"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mr-auto">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-bl-none border border-white/10 flex space-x-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-brand-gold rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-brand-gold rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-brand-gold rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-brand-secondary">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Ask our concierge..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl py-4 px-5 pr-12 text-[13px] text-white focus:outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/10"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gold hover:text-white disabled:opacity-30 transition-all active:scale-90"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-4 text-center">
                <span className="text-[8px] uppercase tracking-[0.3em] text-white/10">Powered by OpenAI GPT-4o</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-brand-gold text-brand-dark shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center relative overflow-hidden group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </motion.button>
    </div>
  );
};
