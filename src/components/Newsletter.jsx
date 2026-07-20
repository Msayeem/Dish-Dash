"use client"
import { useState } from 'react';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API request to backend stack
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <section className="w-full  py-20 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative overflow-hidden bg-slate-800/20 border border-slate-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          
          {/* Subtle Decorative Background Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Heading Block */}
          <div className="max-w-2xl mx-auto mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 mb-3">
              Weekly Inspiration
            </h2>
            <p className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight mb-4">
              Get fresh recipes delivered straight to your inbox
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Join our community of home chefs. Sign up to receive seasonal meal plans, exclusive cooking tips, and the most trending community recipes every Sunday morning.
            </p>
          </div>

          {/* Form / Success State Control */}
          <div className="max-w-md mx-auto">
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 animate-fade-in">
                <FaCheckCircle className="w-6 h-6" />
                <span className="text-sm font-medium">Awesome! You're officially on the list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={status === 'loading'}
                    className="w-full px-5 py-3.5 bg-slate-900 border border-slate-700/60 rounded-xl text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 transition-colors duration-200 disabled:opacity-60"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 hover:brightness-110 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none shadow-lg shadow-orange-500/10"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <FaPaperPlane className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
            
            <p className="text-[11px] text-slate-500 mt-4">
              Zero spam. Unsubscribe at any time you wish.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}