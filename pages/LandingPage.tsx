import React, { useEffect, useState } from 'react';
import { ArrowRight, Music, BookOpen, ShoppingBag, Sparkles, Heart, Clock } from 'lucide-react';

export const LandingPage: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const appFeatures = [
        {
            icon: Music,
            title: 'Raag Explorer',
            description: 'Discover raags by time, season, and mood. Experience the classical tradition through modern exploration.',
            gradient: 'from-amber-500/10 to-orange-500/10'
        },
        {
            icon: BookOpen,
            title: 'Daily Listening & Learn',
            description: 'Curated daily raga sessions and comprehensive guides to classical music fundamentals.',
            gradient: 'from-indigo-500/10 to-purple-500/10'
        },
        {
            icon: ShoppingBag,
            title: 'Artisan Instruments',
            description: 'Handcrafted sitars, sarods, and tablas from master luthiers. Each piece a work of art.',
            gradient: 'from-emerald-500/10 to-teal-500/10'
        },
        {
            icon: Heart,
            title: 'Instrument Care Guide',
            description: 'Track warranty, tuning schedules, and maintenance. Your instruments deserve world-class care.',
            gradient: 'from-rose-500/10 to-pink-500/10'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F2E26] via-[#0a1f1a] to-black text-white">

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">

                {/* Ambient background elements */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse-slow" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
                </div>

                {/* Floating musical notes animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni'].map((note, i) => (
                        <div
                            key={i}
                            className="absolute text-gold-500/10 font-serif text-2xl"
                            style={{
                                left: `${20 + i * 12}%`,
                                top: `${30 + Math.sin(i) * 20}%`,
                                animation: `float ${4 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
                            }}
                        >
                            {note}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-500/10 border-2 border-gold-500/30 mb-6">
                        <Sparkles className="text-gold-400" size={32} />
                    </div>

                    {/* Main heading */}
                    <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-gold-400 tracking-wide leading-tight">
                        House of Swar
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Your personal sanctuary for Indian classical music.
                        <span className="block mt-2 text-gold-400/80">Explore ragas, learn traditions, care for instruments.</span>
                    </p>

                    {/* CTA */}
                    <button className="group mt-8 px-10 py-5 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold text-sm uppercase tracking-widest rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] transition-all duration-300 flex items-center gap-3 mx-auto">
                        Begin Your Journey
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10">
                    <div className="flex flex-col items-center gap-2 animate-bounce">
                        <div className="w-px h-12 bg-gradient-to-b from-gold-500/50 to-transparent" />
                        <Clock size={16} className="text-gold-500/50" />
                    </div>
                </div>
            </section>

            {/* APP FEATURES SECTION */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Section header */}
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl text-gold-400 mb-4">What's Inside</h2>
                        <p className="text-slate-400 text-lg font-light">Everything a classical musician needs, crafted with devotion</p>
                    </div>

                    {/* Feature grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {appFeatures.map((feature, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-gradient-to-br from-charcoal/70 to-surface/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-gold-500/40 transition-all duration-500 hover:-translate-y-1 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                            >
                                {/* Icon container */}
                                <div className="mb-6">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} border border-gold-500/20`}>
                                        <feature.icon className="text-gold-400" size={28} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="font-serif text-2xl text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-light">{feature.description}</p>

                                {/* Hover glow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CRAFT & HERITAGE SECTION */}
            <section className="py-24 px-6 bg-gradient-to-b from-transparent via-black/50 to-transparent">
                <div className="max-w-4xl mx-auto">

                    {/* Centered card */}
                    <div className="bg-gradient-to-br from-charcoal/80 to-surface/40 backdrop-blur-sm border-2 border-gold-500/30 rounded-3xl p-12 text-center shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full">
                                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Our Philosophy</span>
                            </div>

                            <h2 className="font-serif text-3xl md:text-4xl text-gold-400 leading-relaxed">
                                Where ancient tradition meets modern technology
                            </h2>

                            <p className="text-slate-300 text-lg leading-relaxed font-light max-w-2xl mx-auto">
                                House of Swar preserves the soul of Indian classical music while making it accessible to today's musicians.
                                From masterfully crafted instruments to time-honored ragas, we honor the past while embracing the future.
                            </p>

                            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-slate-400">
                                <div className="text-center">
                                    <div className="text-2xl font-serif text-gold-400 mb-1">500+</div>
                                    <div className="text-xs uppercase tracking-wider">Raags Indexed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-serif text-gold-400 mb-1">50+</div>
                                    <div className="text-xs uppercase tracking-wider">Master Artisans</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-serif text-gold-400 mb-1">1000+</div>
                                    <div className="text-xs uppercase tracking-wider">Musicians Trust Us</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="font-serif text-2xl md:text-3xl text-gold-400 italic leading-relaxed mb-6">
                        "House of Swar doesn't just preserve tradition — it breathes life into it.
                        This is what the future of classical music looks like."
                    </p>
                    <p className="text-slate-500 tracking-widest text-sm">— Classical Musician & Educator</p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-16 px-6 border-t border-gold-500/10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <div className="font-serif text-2xl text-gold-400 mb-2">House of Swar</div>
                            <p className="text-slate-500 text-sm">Where Sound Becomes Legacy</p>
                        </div>
                        <div className="flex gap-8 text-sm text-slate-500">
                            <a href="#" className="hover:text-gold-400 transition-colors">About</a>
                            <a href="#" className="hover:text-gold-400 transition-colors">Features</a>
                            <a href="#" className="hover:text-gold-400 transition-colors">Contact</a>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-gold-500/10 text-center text-slate-600 text-xs">
                        © 2025 House of Swar. Crafted with devotion.
                    </div>
                </div>
            </footer>

            {/* Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};
