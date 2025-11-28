import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Sitar } from './Sitar';

interface LoginProps {
  onLogin: (user: { name: string; mobile: string; email: string }) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: ''
  });

  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile: string) => {
    return /^\d{10}$/.test(mobile.replace(/\D/g, ''));
  };

  const validateName = (name: string) => {
    return name.trim().split(/\s+/).length >= 2;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateName(formData.name)) {
      setError('Please enter your full name (First & Last name).');
      return;
    }

    if (!validateMobile(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    onLogin(formData);
  };

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center relative overflow-hidden">
      <div className="grain-overlay"></div>
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        {/* Updated Gradient for Green Theme #00472d */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/90 to-midnight/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-[fade-in_1s_ease-out]">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <Sitar className="text-gold-400" size={32} />
          </div>
          <h1 className="font-display text-3xl text-gold-100 mb-2 tracking-wide drop-shadow-lg">House of Swar</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm animate-fade-in">
            <p className="text-red-400 text-xs text-center font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 backdrop-blur-md bg-black/20 p-8 border border-white/10 rounded-sm shadow-2xl">
          <div className="space-y-1">
            <label className="text-xs text-gold-300 uppercase tracking-widest ml-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black/40 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-serif placeholder:text-white/30"
              placeholder="e.g. Aditi Rao"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gold-300 uppercase tracking-widest ml-1">Mobile Number</label>
            <input
              type="tel"
              required
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full bg-black/40 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-serif placeholder:text-white/30"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gold-300 uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-black/40 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-serif placeholder:text-white/30"
              placeholder="aditi@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-gold-500 text-midnight font-bold uppercase tracking-widest py-4 hover:bg-gold-400 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
          >
            Enter House <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center text-white/40 text-[10px] mt-6 tracking-wide">
          By entering, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
};